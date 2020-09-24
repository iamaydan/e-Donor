import React from "react";
import { StyleSheet, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const Container = ({ children, style }) => (
  <KeyboardAwareScrollView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.body, style]}
    contentContainerStyle={styles.container}
  >
    {children}
  </KeyboardAwareScrollView>
);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
