import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomText } from "./CustomText";

export const AvatarMaker = (fullname, height) => (
  <View style={styles.body}>
    <CustomText weight="semi" style={{ ...styles.text, fontSize: height }}>
      {fullname ? [fullname[0], fullname[fullname.indexOf(" ") + 1]] : "??"}
    </CustomText>
  </View>
);

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: "#dbdbdb",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textTransform: "capitalize",
    color: "#ff6767",
  },
});
