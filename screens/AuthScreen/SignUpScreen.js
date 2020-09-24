import React, { useState } from "react";
import i18n from "i18n-js";
import { connect } from "react-redux";
import { StyleSheet, View, Alert } from "react-native";
import { CheckBox, Icon, Input } from "@ui-kitten/components";

import { signUp } from "./../../store/auth";
import { Container } from "./../../commons";
import { ModalWindow } from "./ModalWindow";
import { CustomBtn, Link, TCustomText } from "./../../components";
import { SIGNUP_INITIAL_STATE, AUTH_DATA } from "../../utils/dummy";
import { getWidthByPercents } from "../../utils/getWidthByPercents";

export const SignUpScreen = connect(null, { signUp })(({ signUp }) => {
  const [fields, setFields] = useState(SIGNUP_INITIAL_STATE);
  const [showPass, setShowPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const fieldsChangeHandler = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const togglePass = (props) => (
    <Icon
      {...props}
      name={showPass ? "md-eye" : "md-eye-off"}
      pack="ion"
      onPress={() => setShowPass(!showPass)}
    />
  );

  const toggleModal = () => {
    setChecked(true);
    setShowModal(false);
  };

  const validateForm = () => {
    for (let key in fields) {
      if (fields[key].trim() === "") {
        Alert.alert(`${i18n.t(key)}  ${i18n.t("req")}`);
        return false;
      } else if (fields.password !== fields.repassword) {
        Alert.alert(i18n.t("pass_match"));
        return false;
      } else if (!checked) {
        Alert.alert(i18n.t("agree"));
        return false;
      } else return true;
    }
  };

  const onSubmit = () => {
    const { email, password, username, fullname } = fields;
    if (validateForm()) signUp(email, password, username, fullname);
  };

  return (
    <Container style={{ backgroundColor: "#fff" }}>
      {AUTH_DATA.map((item) => {
        const {
          name,
          label,
          value,
          caption,
          placeholder,
          captionIcon,
          keyboardType,
          accessoryRight,
        } = item;
        return (
          <Input
            key={item.value}
            label={i18n.t(label)}
            value={fields[value]}
            caption={i18n.t(caption)}
            captionIcon={captionIcon}
            keyboardType={keyboardType}
            style={styles.bottomSpacing}
            placeholder={i18n.t(placeholder)}
            onChangeText={(val) => fieldsChangeHandler(name, val)}
            accessoryRight={
              value === "password" || value === "repassword"
                ? togglePass
                : accessoryRight
            }
            secureTextEntry={
              (value === "password" || value === "repassword") && !showPass
            }
          />
        );
      })}
      <View style={styles.container}>
        <CheckBox checked={checked} onChange={(val) => setChecked(val)}>
          {<TCustomText style={styles.checkText}>agreement</TCustomText>}
        </CheckBox>
        <Link
          title="terms_and_conditions"
          style={styles.link}
          onPress={() => setShowModal(!showModal)}
        />
        <ModalWindow
          onBackdropPress={() => setShowModal(false)}
          onPress={toggleModal}
          visible={showModal}
        />
      </View>
      <CustomBtn
        onPress={onSubmit}
        title="create_account"
        style={{ borderWidth: 0 }}
        width={getWidthByPercents(80, 2)}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 25,
  },
  checkText: {
    color: "#000",
    marginHorizontal: 10,
    fontSize: 16,
  },
  link: {
    fontSize: 13,
    marginLeft: 32,
  },
  bottomSpacing: {
    marginBottom: 15,
  },
});
