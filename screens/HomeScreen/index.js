import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { connect } from "react-redux";

import { CardCover } from "./CardCover";
import { selectUserID } from "../../store/auth";
import {
  getAndListenForPosts,
  selectPostLists,
  getAndListenSavedPosts,
  selectSavedLists,
  deleteSavedPostList,
} from "../../store/posts";

const mapStateToProps = (state) => ({
  posts: selectPostLists(state),
  userID: selectUserID(state),
  savedPosts: selectSavedLists(state),
});

export const HomeScreen = connect(mapStateToProps, {
  getAndListenForPosts,
  getAndListenSavedPosts,
  deleteSavedPostList,
})(
  ({
    getAndListenForPosts,
    getAndListenSavedPosts,
    deleteSavedPostList,
    posts,
    savedPosts,
    userID,
    navigation,
    type,
  }) => {
    useEffect(() => {
      if (type === "posts") getAndListenForPosts();
      else {
        deleteSavedPostList();
        getAndListenSavedPosts(userID);
      }
    }, []);

    const renderItem = ({ item }) => (
      <CardCover item={item} navigation={navigation} userID={userID} />
    );

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={type === "posts" ? posts : savedPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  list: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingTop: 15,
  },
});
