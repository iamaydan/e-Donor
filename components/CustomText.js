import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

import { FONT_FAMILIES } from "../styles/fonts";

export const CustomText = ({ weight, style, children, ...rest }) => {
  const { colors } = useTheme();
  const styles = {
    fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
    color: colors.text,
    ...style,
  };

  return (
    <Text style={styles} {...rest}>
      {children}
    </Text>
  );
};
