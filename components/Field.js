import React from "react";
import i18n from "i18n-js";
import { StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";

export const Field = ({
  label = "",
  value,
  style,
  caption = "",
  disabled,
  textStyle,
  captionIcon,
  placeholder = "",
  onChangeText,
  keyboardType,
  accessoryRight,
  secureTextEntry,
}) => (
  <Input
    value={value}
    disabled={disabled}
    label={i18n.t(label)}
    caption={i18n.t(caption)}
    captionIcon={captionIcon}
    keyboardType={keyboardType}
    onChangeText={onChangeText}
    accessoryRight={accessoryRight}
    style={[styles().input, style]}
    placeholder={i18n.t(placeholder)}
    secureTextEntry={secureTextEntry}
    textStyle={[styles().text, textStyle]}
  />
);

const styles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    input: {
      marginBottom: 15,
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBG,
    },
    text: {
      color: colors.inputText,
    },
  });
};
