import React, { useState } from "react";
import i18n from "i18n-js";
import { StyleSheet, Alert } from "react-native";
import { connect, useSelector } from "react-redux";

import { Container } from "../../commons";
import { GLOBAL_STYLES } from "../../styles";
import { getWidthByPercents } from "../../utils";
import { Field, CustomBtn } from "../../components";
import { deleteAccount, logOut, selectMail } from "../../store/auth";

export const DeleteAccountScreen = connect(null, {
  logOut,
  deleteAccount,
})(({ deleteAccount, logOut }) => {
  const email = useSelector(selectMail);
  const [password, setPassword] = useState("");

  const onSumbit = () => {
    if (password.trim() === "") {
      Alert.alert(i18n.t("pass_required"), i18n.t("pass_required2"));
    } else {
      deleteAccount(email, password);
      logOut();
    }
  };

  return (
    <Container style={styles.container}>
      <Field
        label="password"
        placeholder="password"
        secureTextEntry={false}
        style={styles.field}
        value={password}
        onChangeText={(val) => setPassword(val)}
      />
      <CustomBtn
        title="delete_account"
        width={getWidthByPercents(80, 2)}
        onPress={onSumbit}
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
