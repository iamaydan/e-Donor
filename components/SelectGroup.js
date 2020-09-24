import React, { useState } from "react";
import { Icon } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";

import { TCustomText } from "./TCustomText";

export const SelectGroup = ({ onChangeOption, options, initial, style }) => {
  const [groups, setGroups] = useState({
    state: false,
    selected: initial || options[0],
  });
  const toggleHandler = () => {
    setGroups((group) => ({
      ...group,
      state: !group.state,
    }));
  };
  const setGroupItemHandler = (option, index) => {
    setGroups((group) => ({
      ...group,
      state: false,
      selected: option,
    }));

    onChangeOption(options[index]);
  };
  const { colors } = useTheme();
  const color = {
    backgroundColor: colors.inputBG,
    borderColor: colors.inputBorder,
  };
  return (
    <View style={[{ width: "100%" }, style]}>
      <TouchableOpacity onPress={toggleHandler}>
        <View style={[styles.container, color]}>
          <TCustomText weight="semi" style={{ color: colors.inputText }}>
            {groups.selected}
          </TCustomText>
          <Icon
            pack="feather"
            style={{ height: 20, color: colors.inputText }}
            name={groups.state ? "chevron-up" : "chevron-down"}
          />
        </View>
      </TouchableOpacity>
      {groups.state && (
        <ScrollView
          nestedScrollEnabled
          style={[styles.group, color]}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={option}
              onPress={() => setGroupItemHandler(option, index)}
            >
              <TCustomText
                weight="regular"
                style={{ ...styles.groupItem, ...color }}
              >
                {option}
              </TCustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  group: {
    top: 40,
    zIndex: 20,
    height: 160,
    elevation: 4,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    position: "absolute",
    paddingHorizontal: 20,
  },
  groupItem: {
    fontSize: 17,
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
