import React from "react";
import { Icon } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import i18n from "i18n-js";

import { HeaderStyles, AuthHeader } from "./../styles";
import { WelcomeScreen, SignUpScreen, LogInScreen } from "./../screens";

const { Navigator, Screen } = createStackNavigator();

export const AuthStack = () => (
  <Navigator
    screenOptions={({ navigation }) => ({
      ...HeaderStyles,
      ...AuthHeader,
      headerLeft: (props) => (
        <Icon
          {...props}
          name="md-arrow-back"
          pack="ion"
          onPress={() => navigation.goBack()}
          style={{ height: 25, color: "#fff", marginLeft: 15 }}
        />
      ),
    })}
  >
    <Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false, title: i18n.t("welcome") }}
    />
    <Screen
      name="Signup"
      component={SignUpScreen}
      options={{ title: i18n.t("signup") }}
    />
    <Screen
      name="Login"
      component={LogInScreen}
      options={{ title: i18n.t("login") }}
    />
  </Navigator>
);
