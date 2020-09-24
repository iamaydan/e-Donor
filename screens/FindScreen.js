import React, { useState } from "react";
import { connect } from "react-redux";
import { Icon, Input } from "@ui-kitten/components";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Container } from "./../commons";
import { selectUserID } from "./../store/auth";
import { CardCover } from "./HomeScreen/CardCover";
import { selectPostLists } from "./../store/posts";
import { TCustomText, RadioGroup } from "./../components";
import { getAll } from "./../utils";

const mapStateToProps = (state) => ({
  posts: selectPostLists(state),
  userID: selectUserID(state),
});

export const FindScreen = connect(mapStateToProps)(
  ({ posts, navigation, userID }) => {
    const [status, setStatus] = useState(false);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const reset = () => {
      setStatus(false);
      setList([]);
    };

    console.log("filter : ", filter);
    return (
      <Container>
        <Input
          value={search}
          placeholder="type here to search"
          accessoryRight={() => (
            <Icon
              name="md-search"
              pack="ion"
              style={styles.icon}
              onPress={() => {
                setList(getAll(posts, search, filter));
                setStatus(true);
              }}
            />
          )}
          onChangeText={setSearch}
        />
        <RadioGroup
          options={["all", "users", "locations", "blood types"]}
          value={filter}
          onValueChange={(val) => {
            setFilter(val);
            setList(getAll(posts, search, filter));
            setStatus(true);
          }}
          contentContainerStyle={{ width: "100%", marginTop: 15 }}
        />
        {status && (
          <View style={styles.list}>
            <TouchableOpacity onPress={reset}>
              <TCustomText style={styles.reset}>reset</TCustomText>
            </TouchableOpacity>
            {list.map((item) => (
              <CardCover
                key={item.id.toString()}
                item={item}
                navigation={navigation}
                userID={userID}
              />
            ))}
          </View>
        )}
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    marginBottom: 100,
    zIndex: -2,
    alignItems: "center",
  },
  icon: {
    height: 20,
    color: "#8f9bb3",
    marginRight: 10,
  },
  reset: {
    marginBottom: 15,
    color: "#ff6767",
  },
});
