import * as firebase from "firebase";
import "firebase/firestore";
import { selectUserID, selectPhoto, selectName } from "./auth";

const SET_POSTS_LISTS = "SET_POSTS_LIST";
const TOGGLE_POST_SAVE = "TOGGLE_POST_SAVE";
const SET_SAVED_POST = "SET_SAVED_POST";
const ADD_SAVED_POST = "ADD_SAVED_POST";
const DELETE_SAVED_POST = "DELETE_SAVED_POST";
const DELETE_SAVED_POST_LISTS = "DELETE_SAVED_POST_LISTS";

export const MODULE_NAME = "posts";
export const selectPostLists = (state) => state[MODULE_NAME].posts;
export const selectSavedLists = (state) => state[MODULE_NAME].saved;

const initialState = {
  posts: [],
  saved: [],
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_POSTS_LISTS:
      return {
        ...state,
        posts: payload,
      };
    case TOGGLE_POST_SAVE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id == payload.postID) {
            return {
              ...post,
              ...payload.post,
            };
          }
          return post;
        }),
      };

    case SET_SAVED_POST:
      return {
        ...state,
        saved: payload,
      };

    case ADD_SAVED_POST:
      return {
        ...state,
        saved: [...state.saved, payload],
      };

    case DELETE_SAVED_POST:
      return {
        ...state,
        saved: state.saved.filter((post) => post.id !== payload),
      };

    case DELETE_SAVED_POST_LISTS:
      return {
        ...state,
        saved: [],
      };

    default:
      return state;
  }
}

export const setPostLists = (payload) => ({
  type: SET_POSTS_LISTS,
  payload,
});
export const togglePostSaves = (payload) => ({
  type: TOGGLE_POST_SAVE,
  payload,
});
export const setSavedPost = (payload) => ({
  type: SET_SAVED_POST,
  payload,
});
export const addSavedPost = (payload) => ({
  type: ADD_SAVED_POST,
  payload,
});
export const deleteSavedPost = (payload) => ({
  type: DELETE_SAVED_POST,
  payload,
});
export const deleteSavedPostList = () => ({
  type: DELETE_SAVED_POST_LISTS,
});

export const getAndListenForPosts = () => async (dispatch) => {
  try {
    const ref = firebase
      .firestore()
      .collection("posts")
      .orderBy("time", "desc");
    const posts = await ref.get();
    const postsArr = [];
    posts.forEach((snap) => {
      postsArr.push({ id: snap.id, ...snap.data() });
    });

    dispatch(setPostLists(postsArr));
  } catch (error) {
    console.log("getAndListenForPosts err => ", error);
  }
};

export const addPostToList = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const userID = selectUserID(state);
    const author_name = selectName(state);
    const user_photo = selectPhoto(state);
    const time = Date.now();
    const saved = [];

    const key = firebase.firestore().collection("posts").doc().id;
    const ref = firebase.firestore().collection("posts").doc(key);

    const postData = {
      ...data,
      author_id: userID,
      author_name,
      user_photo,
      time,
      saved,
    };

    const post = await ref.set(postData);
  } catch (error) {
    console.log("addPostToList error =>", error);
  }
};

export const toggleSavePost = (postID, isSaved, userID) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("posts").doc(postID);
    const post = await ref.get();
    let info = {
      ...post.data(),
    };
    if (isSaved !== undefined) {
      info = {
        ...info,
        saved: [...post.data().saved.filter((id) => id !== userID)],
      };
      firebase
        .firestore()
        .collection("saved")
        .doc(userID)
        .update({ [postID]: firebase.firestore.FieldValue.delete() });
      dispatch(deleteSavedPost(postID));
    } else {
      info = {
        ...info,
        saved: [...post.data().saved, userID],
      };
      firebase
        .firestore()
        .collection("saved")
        .doc(userID)
        .set({ [postID]: info }, { merge: true });
    }
    ref.update(info);
    dispatch(
      togglePostSaves({
        postID,
        userID,
        post: info,
      })
    );
  } catch (error) {
    console.log("savePost err => ", error);
  }
};

export const getAndListenSavedPosts = (userID) => async (dispatch) => {
  try {
    const ref = await firebase.firestore().collection("saved").doc(userID);
    const saveds = await ref.get();

    const keys = Object.keys((await saveds).data());
    const savedPosts = Object.values((await saveds).data());

    const savedPostsArr = savedPosts.map((post, index) => ({
      id: keys[index],
      ...post,
    }));
    const sortedSavedPost = savedPostsArr.sort((a, b) => {
      return b.time - a.time;
    });

    dispatch(setSavedPost(sortedSavedPost));
  } catch (error) {
    console.log("getAndListenSavedPost error =>", error);
  }
};
