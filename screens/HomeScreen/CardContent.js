import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { CustomText } from "../../components";

export const CardContent = ({ bloodType, desc }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.blood, { backgroundColor: colors.bloodBG }]}>
        <CustomText
          weight="bold"
          style={{ ...styles.bloodText, ...{ color: colors.text } }}
        >
          {bloodType}
        </CustomText>
      </View>
      <View style={styles.info}>
        <CustomText style={styles.infoText}>{desc}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#636366",
    borderTopColor: "#636366",
  },
  blood: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  bloodText: {
    fontSize: 22,
  },
  info: {
    justifyContent: "center",
  },
  infoText: {
    width: 200,
    fontSize: 12,
  },
});
