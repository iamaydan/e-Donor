import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Container } from "./../../commons";
import { BLOOD_TYPES } from "../../utils/dummy";
import { AvatarUploader } from "./AvatarUploader";
import { getWidthByPercents } from "../../utils/getWidthByPercents";
import { TCustomText, SelectGroup, CustomBtn, Field } from "../../components";
import {
  selectName,
  selectUsername,
  selectBlood,
  selectPhoto,
  uploadPhoto,
  updateUserInfo,
} from "../../store/auth";

const mapStateToProps = (state) => ({
  fullname: selectName(state),
  username: selectUsername(state),
  bloodType: selectBlood(state),
  photo: selectPhoto(state),
});

export const EditProfileScreen = connect(mapStateToProps, {
  uploadPhoto,
  updateUserInfo,
})(({ username, fullname, bloodType, navigation, updateUserInfo }) => {
  const [fields, setFields] = useState({
    fullname,
    username,
    bloodType: bloodType || "",
  });
  const fieldsChangeHandler = (name, value) =>
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    updateUserInfo(fields);
    navigation.goBack();
  };

  const width = getWidthByPercents(65, 2);
  const btnWidth = getWidthByPercents(45, 2);
  const { colors } = useTheme();
  return (
    <Container>
      <AvatarUploader navigation={navigation} fullname={fullname} />
      <View style={styles.row}>
        <TCustomText>fullname</TCustomText>
        <Field
          style={{ width }}
          value={fields.fullname}
          placeholder={fields.fullname}
          onChangeText={(val) => fieldsChangeHandler("fullname", val)}
        />
      </View>
      <View style={styles.row}>
        <TCustomText>username</TCustomText>
        <Field
          style={{ width }}
          value={fields.username}
          placeholder={fields.username}
          onChangeText={(val) => fieldsChangeHandler("username", val)}
        />
      </View>
      <View style={styles.row}>
        <TCustomText>blood_type</TCustomText>
        <SelectGroup
          style={{ width }}
          initial={bloodType}
          options={BLOOD_TYPES}
          onChangeOption={(val) => fieldsChangeHandler("bloodType", val)}
        />
      </View>
      <View style={styles.actions}>
        <CustomBtn
          title="cancel"
          onPress={goBack}
          width={btnWidth}
          titleStyle={{ color: colors.secondaryText }}
          style={{ backgroundColor: colors.card }}
        />
        <CustomBtn title="save" width={btnWidth} onPress={onSubmit} />
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    marginVertical: 7,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  actions: {
    zIndex: -2,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
