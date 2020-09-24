import { selectUserID, selectName, selectPhoto } from "./auth";
import * as firebase from "firebase";
import "firebase/firestore";

const SET_CHATS_LISTS = "SET_CHATS_LISTS";
const SET_SINGLE_CHAT = "SET_SINGLE_CHAT";
const INIT_SINGLE_CHAT = "INIT_SINGLE_CHAT";
const INIT_CHAT_LIST = "INIT_CHAT_LIST";

export const MODULE_NAME = "chats";
export const selectChatsLists = (state) => state[MODULE_NAME].chats;
export const selectSingleChat = (state) => state[MODULE_NAME].singleChat;

const initialState = {
  chats: [],
  singleChat: [],
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CHATS_LISTS:
      return {
        ...state,
        chats: payload,
      };
    case INIT_CHAT_LIST:
      return {
        ...state,
        chats: [],
        singleChat: [],
      };
    case SET_SINGLE_CHAT:
      return {
        ...state,
        singleChat: payload,
      };

    case INIT_SINGLE_CHAT:
      return {
        ...state,
        singleChat: [],
      };
    default:
      return state;
  }
}

export const setChatsLists = (payload) => ({
  type: SET_CHATS_LISTS,
  payload,
});
export const setSingleChat = (payload) => ({
  type: SET_SINGLE_CHAT,
  payload,
});
export const initSingleChat = () => ({
  type: INIT_SINGLE_CHAT,
});
export const initChatList = () => ({
  type: INIT_CHAT_LIST,
});

export const getAndListenForChatLists = () => async (dispatch, getState) => {
  try {
    const userID = selectUserID(getState());
    await firebase
      .firestore()
      .collection("users_chats_lists")
      .doc(userID)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const lists = doc.data();
          const unionIDs = Object.keys(lists);
          const chatListsArr = [];
          unionIDs.forEach((id) => {
            chatListsArr.push({ id, ...lists[id] });
          });

          const sortedChatListsArr = chatListsArr.sort((a, b) => {
            return b.time - a.time;
          });

          dispatch(setChatsLists(sortedChatListsArr));
        }
      });
  } catch (error) {
    console.log("getAndListenForChatLists error =>", error);
  }
};

export const makeReadMessage = (id) => async (dispatch, getState) => {
  try {
    const userID = selectUserID(getState());
    const lists = selectChatsLists(getState());
    const selectedChat = lists.find((list) => list.id === id);
    delete selectedChat[id];
    await firebase
      .firestore()
      .collection("users_chats_lists")
      .doc(userID)
      .set(
        {
          [id]: { ...selectedChat, readed: true },
        },
        { merge: true }
      );
  } catch (error) {
    console.log("makeReadMessage error =>", error);
  }
};

export const getAndListenForSingleChat = (chatID) => async (
  dispatch,
  getState
) => {
  try {
    const userID = selectUserID(getState());

    await firebase
      .firestore()
      .collection("messages")
      .doc(chatID)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const sortedMessages = data.messages.sort((a, b) => {
            return b.time - a.time;
          });

          dispatch(setSingleChat(sortedMessages));
        }
      });
  } catch (error) {
    console.log("getAndListenForSingleChat error => ", error);
  }
};

export const sendMessage = (messageObj) => async (dispatch, getState) => {
  try {
    const userID = selectUserID(getState());
    const username = selectName(getState());
    const userPhoto = selectPhoto(getState());

    const companion_id = messageObj.chatID
      .split("_")
      .find((chatID) => chatID !== userID);
    const ref = await firebase
      .firestore()
      .collection("messages")
      .doc(messageObj.chatID);

    ref
      .get()
      .then(function (doc) {
        if (doc.exists) {
          ref.update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              author_id: userID,
              text: messageObj.text,
              time: Date.now(),
            }),
          });
        } else {
          ref.set({
            messages: [
              {
                author_id: userID,
                text: messageObj.text,
                time: Date.now(),
              },
            ],
          });
        }
      })
      .catch(function (error) {
        console.log("send message error", error);
      });

    await firebase
      .firestore()
      .collection("users_chats_lists")
      .doc(companion_id)
      .set(
        {
          [messageObj.chatID]: {
            companion_img: userPhoto,
            companion_name: username,
            last_msg: messageObj.text,
            readed: false,
            time: Date.now(),
          },
        },
        { merge: true }
      );
    await firebase
      .firestore()
      .collection("users_chats_lists")
      .doc(userID)
      .set(
        {
          [messageObj.chatID]: {
            companion_img: messageObj.companion_img,
            companion_name: messageObj.companion_name,
            last_msg: messageObj.text,
            readed: true,
            time: Date.now(),
          },
        },
        { merge: true }
      );
  } catch (error) {
    console.log("sendMessage error => ", error);
  }
};
