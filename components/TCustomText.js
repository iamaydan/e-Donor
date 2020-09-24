import React from "react";
import i18n from "i18n-js";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

import { FONT_FAMILIES } from "../styles/fonts";

export const TCustomText = ({ weight, style, children, ...rest }) => {
  const { colors } = useTheme();
  const styles = {
    fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
    color: colors.text,
    ...style,
  };

  return (
    <Text style={styles} {...rest}>
      {i18n.t(children)}
    </Text>
  );
};
