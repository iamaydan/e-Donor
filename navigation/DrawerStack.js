import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { ProfileScreen } from "./../screens";
import { DrawerContent } from "./../commons";

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerStack = () => (
  <Navigator
    drawerContent={({ ...props }) => <DrawerContent {...props} />}
    drawerContentOptions={{
      activeTintColor: "#e91e63",
      itemStyle: { marginVertical: 30 },
    }}
  >
    <Screen name="Profile" component={ProfileScreen} />
  </Navigator>
);
