import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { CustomText } from "./CustomText";
import { getWidthByPercents } from "./../utils/getWidthByPercents";

export const RadioGroup = ({
  options,
  value,
  onValueChange,
  contentContainerStyle,
  radioItemStyle,
}) => (
  <View style={[styles.container, contentContainerStyle]}>
    {options.map((option) => {
      const isActive = value === option;
      return (
        <TouchableOpacity
          onPress={() => onValueChange(option)}
          style={{
            width: getWidthByPercents(100 / options.length, options.length + 1),
          }}
          key={option}
        >
          <View
            style={[
              styles.radioBtn,
              { opacity: isActive ? 1 : 0.5 },
              radioItemStyle,
            ]}
          >
            <CustomText
              weight={isActive ? "bold" : "regular"}
              style={styles.radioLabel}
            >
              {option}
            </CustomText>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioBtn: {
    height: 42,
    borderRadius: 25,
    backgroundColor: "#dadada",
    justifyContent: "center",
    alignItems: "center",
  },
});
