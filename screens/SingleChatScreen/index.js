import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import {
  sendMessage,
  initSingleChat,
  selectSingleChat,
  getAndListenForSingleChat,
} from "../../store/chats";
import { ChatForm } from "./ChatForm";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { selectUserID } from "../../store/auth";

const mapStateToProps = (state) => ({
  messages: selectSingleChat(state),
  userID: selectUserID(state),
});

export const SingleChatScreen = connect(mapStateToProps, {
  sendMessage,
  initSingleChat,
  getAndListenForSingleChat,
})(
  ({
    route,
    userID,
    messages,
    navigation,
    sendMessage,
    initSingleChat,
    getAndListenForSingleChat,
  }) => {
    useEffect(() => {
      getAndListenForSingleChat(route?.params.chatID);
      return initSingleChat;
    }, []);
    const [messageObj, setMessageObj] = useState({
      text: "",
      time: Date.now(),
      author_id: userID,
      chatID: route?.params.chatID,
      companion_img: route?.params.companion_img,
      companion_name: route?.params.companion_name,
    });
    const setMessageText = (val) => {
      setMessageObj((messageObj) => ({
        ...messageObj,
        text: val,
      }));
    };

    const sendMessageHandler = () => {
      sendMessage(messageObj);
      setMessageObj((messageObj) => ({
        ...messageObj,
        text: "",
      }));
    };
    return (
      <View style={{ flex: 1 }}>
        <ChatHeader route={route} navigation={navigation} />
        <ChatMessages messages={messages} userID={userID} />
        <ChatForm
          value={messageObj.text}
          onPress={sendMessageHandler}
          textChange={(val) => setMessageText(val)}
        />
      </View>
    );
  }
);
