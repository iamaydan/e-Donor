import React from "react";
import { Image } from "react-native";
import { IMAGES } from "./images";

export const HeaderStyles = {
  headerMode: "screen",
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: "#ff6767",
    fontSize: 20,
  },
};
export const AuthHeader = {
  headerTitleStyle: {
    fontSize: 20,
    color: "#fff",
  },
  headerStyle: {
    height: 72,
  },
  headerBackground: () => (
    <Image
      source={IMAGES.header}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    />
  ),
};
