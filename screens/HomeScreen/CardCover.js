import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardBottom } from "./CardBottom";

export const CardCover = ({ item, navigation, userID }) => {
  const {
    author_id,
    author_name,
    user_photo,
    time,
    bloodType,
    location,
    desc,
    coordinates,
    saved,
    id,
    number,
  } = item;
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.cardBG }]}>
      <CardHeader
        {...{
          author_id,
          userID,
          user_photo,
          author_name,
          location,
          coordinates,
          time,
          navigation,
        }}
      />
      <CardContent {...{ bloodType, desc }} />
      <CardBottom {...{ saved, userID, id, number }} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 35,
    borderRadius: 10,
  },
});
