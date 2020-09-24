import React from "react";
import i18n from "i18n-js";
import { connect } from "react-redux";
import { Icon } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { logOut } from "../store/auth";
import { ITEMS } from "../utils/dummy";

export const DrawerContent = connect(null, { logOut })(
  ({ logOut, navigation }) => {
    const { colors } = useTheme();
    return (
      <DrawerContentScrollView style={{ backgroundColor: colors.drawerBG }}>
        {ITEMS.map((item) => (
          <DrawerItem
            key={item.title}
            icon={item.icon}
            label={i18n.t(item.title)}
            onPress={() => navigation.navigate(item.goTo)}
          />
        ))}
        <DrawerItem
          label={i18n.t("log_out")}
          icon={() => (
            <Icon
              name="log-out"
              pack="feather"
              style={{ color: "#999999", height: 23 }}
            />
          )}
          onPress={logOut}
        />
      </DrawerContentScrollView>
    );
  }
);
