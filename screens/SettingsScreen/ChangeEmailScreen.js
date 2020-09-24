import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Alert } from "react-native";

import { Container } from "../../commons";
import { GLOBAL_STYLES } from "../../styles";
import { updateEmail } from "../../store/auth";
import { getWidthByPercents } from "../../utils";
import { Field, CustomBtn } from "../../components";

export const ChangeEmailScreen = connect(null, {
  updateEmail,
})(({ navigation, updateEmail }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const fieldsChangeHandler = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const validate = () => {
    for (let key in fields) {
      if (fields[key].trim() === "") {
        Alert.alert(`${key} is required`);
        return false;
      }
    }
    return true;
  };

  const onSumbit = () => {
    if (validate()) {
      updateEmail(fields.email, fields.password);
      navigation.navigate("Profile");
    }
  };

  return (
    <Container style={styles.container}>
      <Field
        label="email"
        placeholder="email"
        style={styles.field}
        value={fields.email}
        onChangeText={(val) => fieldsChangeHandler("email", val)}
      />
      <Field
        label="confirm_pass"
        style={styles.field}
        placeholder="password"
        secureTextEntry={false}
        value={fields.password}
        onChangeText={(val) => fieldsChangeHandler("password", val)}
      />
      <CustomBtn
        onPress={onSumbit}
        title="save_changes"
        width={getWidthByPercents(80, 2)}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  field: {
    marginBottom: GLOBAL_STYLES.BOTTOM + 5,
  },
});
