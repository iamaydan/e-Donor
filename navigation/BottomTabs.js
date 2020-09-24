import React from "react";
import i18n from "i18n-js";
import { Icon } from "@ui-kitten/components";
import { useTheme, DrawerActions } from "@react-navigation/native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import { DrawerStack } from "./DrawerStack";
import { ChatsScreen, CreateScreen, FindScreen, HomeScreen } from "../screens";

const { Navigator, Screen } = AnimatedTabBarNavigator();

export const BottomTabs = ({ navigation, route }) => {
  if (route.state && route.state.index === 4)
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="md-menu"
          pack="ion"
          style={{
            height: 28,
            marginRight: 15,
            color: colors.text,
          }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    });
  else navigation.setOptions({ headerRight: null });
  const { colors } = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: colors.tabbarActive,
        activeTintColor: colors.tabbarTint,
        keyboardHidesTabBar: true,
      }}
      appearence={{
        tabBarBackground: colors.tabbarBG,
        topPadding: 10,
        horizontalPadding: 10,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let name = "";
          if (route.name === "Home") name = "home";
          else if (route.name === "Find") name = "search";
          else if (route.name === "Create") name = "plus-circle";
          else if (route.name === "Chats") name = "message-circle";
          else if (route.name === "Profile") name = "user";

          return (
            <Icon
              name={name}
              pack="feather"
              style={{
                height: 20,
                color: focused ? colors.tabbarTint : "#999999",
              }}
            />
          );
        },
      })}
    >
      <Screen name="Home" options={{ title: i18n.t("home") }}>
        {({ ...props }) => <HomeScreen type="posts" {...props} />}
      </Screen>
      <Screen
        name="Find"
        component={FindScreen}
        options={{ title: i18n.t("find") }}
      />
      <Screen
        name="Create"
        component={CreateScreen}
        options={{ title: i18n.t("create") }}
      />
      <Screen
        name="Chats"
        component={ChatsScreen}
        options={{ title: i18n.t("chats") }}
      />
      <Screen
        name="Profile"
        component={DrawerStack}
        options={{ title: i18n.t("profile") }}
      />
    </Navigator>
  );
};
