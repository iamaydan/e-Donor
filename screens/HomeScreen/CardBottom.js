import React from "react";
import { connect } from "react-redux";
import call from "react-native-phone-call";
import { Icon } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";

import { ICONS } from "./../../styles/icons";
import { TCustomText } from "../../components";
import { toggleSavePost } from "../../store/posts";

export const CardBottom = connect(null, { toggleSavePost })(
  ({ saved, userID, id, toggleSavePost, number }) => {
    const isSaved = saved.find((item) => item === userID);
    const { dark, colors } = useTheme();
    const srcDark = isSaved ? ICONS.savedDark : ICONS.saveDark;
    const srcLight = isSaved ? ICONS.savedLight : ICONS.saveLight;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.phone}
          onPress={() =>
            number
              ? call({
                  number: number,
                  prompt: false,
                })
              : Alert.alert(
                  "Number is not provided",
                  "Try to write user via dm"
                )
          }
        >
          <Icon
            name="phone"
            pack="feather"
            style={[styles.phoneIcon, { color: colors.text }]}
          />
          <TCustomText
            weight="bold"
            style={{ ...styles.phoneText, ...{ color: colors.text } }}
          >
            call
          </TCustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSavePost(id, isSaved, userID)}>
          <Image style={styles.saveIcon} source={dark ? srcDark : srcLight} />
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  phone: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneIcon: {
    height: 18,
    paddingVertical: 6,
    marginRight: 10,
  },
  phoneText: {
    fontSize: 12,
    textTransform: "uppercase",
  },
  saveIcon: {
    width: 20,
    height: 20,
  },
});
