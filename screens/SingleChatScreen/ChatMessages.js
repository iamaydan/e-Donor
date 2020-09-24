import React from "react";
import { FlatList } from "react-native";

import { ChatMessageBubble } from "./ChatMessageBubble";

export const ChatMessages = ({ messages, userID }) => (
  <FlatList
    data={messages}
    inverted={true}
    renderItem={({ item }) => (
      <ChatMessageBubble message={item} userID={userID} />
    )}
    keyExtractor={(item) => item.time.toString() + item.text}
  />
);
