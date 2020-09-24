import React from "react";
import i18n from "i18n-js";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { selectAuthStatus } from "../store/auth";
import { LightTheme, DarkTheme } from "../theme";
import { getTheme, getLanguage } from "../store/settings";

const mapStateToProps = (state) => ({
  auth: selectAuthStatus(state),
  theme: getTheme(state),
  language: getLanguage(state),
});

import en from "./../translations/en.json";
import az from "./../translations/az.json";
import ru from "./../translations/ru.json";

i18n.translations = {
  en,
  ru,
  az,
};
export const RootNav = connect(mapStateToProps)(({ auth, theme, language }) => {
  i18n.locale =
    language === "azerbaijani"
      ? "az-US"
      : language === "russian"
      ? "ru-US"
      : "en-US";

  i18n.fallbacks = true;
  return (
    <NavigationContainer theme={theme === "light" ? LightTheme : DarkTheme}>
      {auth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
});
