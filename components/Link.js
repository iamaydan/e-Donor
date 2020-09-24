import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { TCustomText } from "./TCustomText";

export const Link = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <TCustomText weight="semi" style={{ ...styles.title, ...style }}>
      {title}
    </TCustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    color: "#0070c9",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
