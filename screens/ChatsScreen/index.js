import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";

import { ChatsCover } from "./ChatsCover";
import { TCustomText } from "../../components";
import {
  initChatList,
  makeReadMessage,
  selectChatsLists,
  getAndListenForChatLists,
} from "../../store/chats";

const mapStateToProps = (state) => ({
  lists: selectChatsLists(state),
});

export const ChatsScreen = connect(mapStateToProps, {
  initChatList,
  makeReadMessage,
  getAndListenForChatLists,
})(
  ({
    lists,
    navigation,
    initChatList,
    makeReadMessage,
    getAndListenForChatLists,
  }) => {
    useEffect(() => {
      getAndListenForChatLists();
      return initChatList;
    }, []);
    const gotoChat = ({ id, companion_img, companion_name }) => {
      navigation.navigate("SingleChat", {
        companion_name,
        companion_img,
        chatID: id,
      });
      makeReadMessage(id);
    };
    const renderItem = ({ item }) => {
      return <ChatsCover chat={item} onPress={() => gotoChat(item)} />;
    };
    const { colors } = useTheme();
    return (
      <View style={styles.container}>
        <TCustomText style={{ ...styles.title, ...{ color: colors.link } }}>
          recent_chats
        </TCustomText>
        <FlatList
          data={lists}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    marginVertical: 10,
    fontSize: 14,
  },
});
