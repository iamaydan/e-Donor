import React from "react";
import i18n from "i18n-js";
import { useSelector } from "react-redux";
import { Icon } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useTheme,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

import { BottomTabs } from "./BottomTabs";
import { HeaderStyles } from "../styles";
import { selectUsername } from "../store/auth";
import {
  ProfileScreen,
  SingleChatScreen,
  HomeScreen,
  EditProfileScreen,
  RateScreen,
  AboutScreen,
  SettingsScreen,
  ChangeEmailScreen,
  ChangePassScreen,
  DeleteAccountScreen,
} from "./../screens";

const { Navigator, Screen } = createStackNavigator();

export const AppStack = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      headerMode="screen"
      screenOptions={({ navigation }) => ({
        ...HeaderStyles,
        headerLeft: (props) => (
          <Icon
            {...props}
            name="md-arrow-back"
            pack="ion"
            onPress={() => navigation.goBack()}
            style={{ height: 25, color: colors.text, marginLeft: 15 }}
          />
        ),
      })}
    >
      <Screen
        name="BottomTabs"
        component={BottomTabs}
        options={({ route }) => ({
          ...HeaderStyles,
          headerTitle: getHeaderTitle(route),
          headerLeft: null,
        })}
      />
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ route }) => ({
          headerTitle: route.params?.author_name,
          headerTitleStyle: {
            fontSize: 17,
          },
        })}
      />
      <Screen
        name="SingleChat"
        component={SingleChatScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{ headerLeft: null, title: i18n.t("edit_profile") }}
      />
      <Screen name="Saved" options={{ title: i18n.t("saved") }}>
        {() => <HomeScreen type="saved" />}
      </Screen>
      <Screen
        name="Rate"
        component={RateScreen}
        options={{ title: i18n.t("rate") }}
      />
      <Screen
        name="About"
        component={AboutScreen}
        options={{ title: i18n.t("about") }}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: i18n.t("settings") }}
      />
      <Screen
        name="Change Email"
        component={ChangeEmailScreen}
        options={{ title: i18n.t("change_email") }}
      />
      <Screen
        name="Change Password"
        component={ChangePassScreen}
        options={{ title: i18n.t("change_password") }}
      />
      <Screen
        name="Delete Acoount"
        component={DeleteAccountScreen}
        options={{ title: i18n.t("delete_account") }}
      />
    </Navigator>
  );
};

export function getHeaderTitle(route) {
  const username = useSelector(selectUsername);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  switch (routeName) {
    case "Home":
      return i18n.t("home");
    case "Find":
      return i18n.t("find");
    case "Create":
      return i18n.t("new_post");
    case "Chats":
      return i18n.t("chats");
    case "Profile":
      return username;
  }
}
