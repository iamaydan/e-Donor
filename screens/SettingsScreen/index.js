import React from "react";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { Toggle, Icon } from "@ui-kitten/components";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";

import { Container } from "../../commons";
import { LANGUAGES } from "../../utils/dummy";
import { TCustomText, SelectGroup } from "../../components";
import { getWidthByPercents } from "../../utils/getWidthByPercents";
import {
  getTheme,
  setTheme,
  getLanguage,
  setLanguage,
} from "../../store/settings";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  language: getLanguage(state),
});

export const SettingsScreen = connect(mapStateToProps, {
  setTheme,
  setLanguage,
})(({ theme, language, setTheme, setLanguage, navigation }) => {
  const themeHandler = (val) => {
    if (val) setTheme("dark");
    else setTheme("light");
  };
  const { colors } = useTheme();
  const border = { borderBottomColor: colors.inputText };
  return (
    <Container>
      <View style={[styles.options, border]}>
        <TCustomText style={styles.optionsText}>theme</TCustomText>
        <View style={styles.row}>
          <TCustomText>{theme === "light" ? "light" : "dark"}</TCustomText>
          <Toggle
            onChange={themeHandler}
            style={{ marginLeft: 20 }}
            checked={theme === "dark" ? true : false}
          />
        </View>
      </View>
      <View style={[styles.options, border]}>
        <TCustomText style={styles.optionsText}>language</TCustomText>
        <SelectGroup
          initial={language}
          options={LANGUAGES}
          onChangeOption={setLanguage}
          style={{ width: getWidthByPercents(55, 2) }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.options, border]}
          onPress={() => navigation.navigate("Change Email")}
        >
          <TCustomText style={styles.optionsText}>change_email</TCustomText>
          <Icon
            name="chevron-right"
            pack="feather"
            style={{ height: 20, color: colors.text }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.options, border]}
          onPress={() => navigation.navigate("Change Password")}
        >
          <TCustomText style={styles.optionsText}>change_password</TCustomText>
          <Icon
            name="chevron-right"
            pack="feather"
            style={{ height: 20, color: colors.text }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.options, border]}
          onPress={() => navigation.navigate("Delete Acoount")}
        >
          <TCustomText style={styles.optionsText}>delete_account</TCustomText>
          <Icon
            name="chevron-right"
            pack="feather"
            style={{ height: 20, color: colors.text }}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    zIndex: -20,
    width: "100%",
  },
  options: {
    height: 50,
    width: "100%",
    marginVertical: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  optionsText: {
    padding: 14,
    fontSize: 16,
  },
  icon: {
    height: 20,
    color: "#fff",
  },
});
