import React from "react";
import { Image } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { CustomText, AvatarMaker } from "../../components";
import { getMessageTime } from "../../utils/getMessageTime";

export const ChatsCover = ({ chat, onPress }) => {
  const { companion_name, companion_img, last_msg, time, readed } = chat;
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listCover}>
        {companion_img ? (
          <Image
            style={styles.userAvatar}
            source={{ uri: companion_img }}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={{ backgroundColor: "#f2f4f8" }}
          />
        ) : (
          <View style={styles.userAvatar}>
            {AvatarMaker(companion_name, 22)}
          </View>
        )}
        <View style={styles.content}>
          <View>
            <CustomText
              weight="semi"
              style={{ ...styles.title, ...{ color: colors.text } }}
            >
              {companion_name}
            </CustomText>
            <CustomText
              numberOfLines={1}
              weight={readed ? "regular" : "bold"}
              style={{ ...styles.lastMessage, ...{ color: colors.lastMsg } }}
            >
              {last_msg}
            </CustomText>
          </View>
          <View style={styles.timeRow}>
            <CustomText
              weight="bold"
              style={{ ...styles.time, ...{ color: colors.secondaryText } }}
            >
              {getMessageTime(time)}
            </CustomText>
            {!readed && (
              <View
                style={{
                  ...styles.unread,
                  ...{ backgroundColor: colors.link },
                }}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listCover: {
    flexDirection: "row",
    height: 68,
    alignItems: "center",
    borderBottomColor: "#8994a3",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
  },
  lastMessage: {
    fontSize: 13,
  },
  timeRow: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 11,
    marginBottom: 15,
  },
  unread: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
