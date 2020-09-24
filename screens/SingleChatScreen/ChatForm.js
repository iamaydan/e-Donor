import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { Field } from "./../../components/Field";
import { Icon } from "@ui-kitten/components";

export const ChatForm = ({ onPress, value, textChange }) => {
  const [state, setState] = useState(false);
  const textChangehandler = (val) => {
    if (val.trim() !== "") setState(true);
    else setState(false);
    textChange(val);
  };
  useEffect(() => textChangehandler(value), [value]);
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[
        styles.container,
        {
          backgroundColor: colors.chatBG,
          justifyContent: state ? "space-between" : "center",
        },
      ]}
    >
      <Field
        value={value}
        placeholder="type_here"
        textStyle={{ color: colors.text }}
        onChangeText={(val) => textChangehandler(val)}
        style={[
          styles.field,
          { backgroundColor: colors.chatFormBG, width: state ? "85%" : "70%" },
        ]}
      />
      {state && (
        <TouchableOpacity onPress={onPress}>
          <Icon
            name="send"
            pack="feather"
            style={[styles.icon, { color: colors.secondaryText }]}
          />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderColor: "#999999",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  field: {
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  icon: {
    height: 25,
    marginRight: 10,
  },
});
