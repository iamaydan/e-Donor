import React, { useState } from "react";
import { Image } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { CustomText, TCustomText } from "../../components";
import { getTimeFromPosted } from "../../utils";
import { AvatarMaker, MapModal } from "../../components";

export const CardHeader = ({
  author_id,
  userID,
  user_photo,
  author_name,
  location,
  coordinates,
  time,
  navigation,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const formattedTime = getTimeFromPosted(time);
  const isMe = author_id === userID;
  const goTo = () => {
    isMe
      ? navigation.navigate("Profile")
      : navigation.navigate("ProfileScreen", {
          author_id,
          author_name,
          type: "other",
        });
  };
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goTo}>
        {user_photo ? (
          <Image
            style={styles.image}
            source={{ uri: user_photo }}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={{ backgroundColor: "#f2f4f8" }}
          />
        ) : (
          <View style={styles.image}>{AvatarMaker(author_name, 15)}</View>
        )}
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity onPress={goTo} style={styles.header}>
          {isMe ? (
            <TCustomText weight="semi" style={{ fontSize: 15 }}>
              me
            </TCustomText>
          ) : (
            <CustomText weight="semi" style={{ fontSize: 15 }}>
              {author_name}
            </CustomText>
          )}

          <CustomText
            weight="regular"
            style={{ ...styles.time, ...{ color: colors.time } }}
          >
            {formattedTime}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsMapOpen(true)}
          style={styles.location}
        >
          <CustomText numberOfLines={1} style={styles.locationText}>
            {location}
          </CustomText>
        </TouchableOpacity>
      </View>

      <MapModal
        visible={isMapOpen}
        close={() => setIsMapOpen(false)}
        type="static"
        initialRegion={{
          latitude: coordinates[0],
          longitude: coordinates[1],
          latitudeDelta: 0.5522,
          longitudeDelta: 0.5521,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 10,
  },
  info: {
    width: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 12,
  },
  location: {
    width: 180,
  },
  locationText: {
    fontSize: 12,
  },
});
