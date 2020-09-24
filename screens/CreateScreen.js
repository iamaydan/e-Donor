import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as Location from "expo-location";
import { Icon } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Container } from "./../commons";
import { BLOOD_TYPES } from "../utils/dummy";
import { addPostToList } from "../store/posts";
import { getWidthByPercents } from "./../utils";
import {
  Field,
  MapModal,
  CustomBtn,
  CustomText,
  SelectGroup,
} from "../components";

export const CreateScreen = connect(null, { addPostToList })(
  ({ addPostToList, navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [fields, setFields] = useState({
      desc: "",
      number: "",
      bloodType: "",
      coordinates: [],
      location: "",
    });

    const [isMapOpen, setIsMapOpen] = useState(false);
    //GETTING PERMISSION FOR LOCATION
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          enableHighAccuracy: true,
        });
        setLocation(location);
      })();
    }, []);
    //SETTIN FIELDS ACCORDING TO NAME
    const fieldsChangeHandler = (name, value) => {
      setFields((fields) => ({
        ...fields,
        [name]: value,
      }));
    };
    //OPENING MAP IN ORDER TO WE GET LOCATION OR NOT
    const openMap = () => {
      if (!!location?.coords?.latitude) {
        setIsMapOpen(true);
      }
    };
    //ADDIN POST TO DATABASE
    const onSubmit = () => {
      addPostToList(fields);
      navigation.navigate("Home");
    };

    //GETTIN LOCATION NAME BY COORDINATES AND SET LOCATION
    const getLocationName = async ({ latitude, longitude }) => {
      const answer = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (!!answer.length) {
        const locObj = answer[0];
        const location = [];
        for (let key in locObj) {
          if (locObj[key] !== null && locObj[key] !== "Unnamed Road") {
            location.push(locObj[key]);
          }
        }

        setFields((field) => ({
          ...field,
          location: location.join(),
        }));
      }
    };
    const { colors } = useTheme();
    return (
      <Container>
        <SelectGroup
          style={styles.field}
          options={BLOOD_TYPES}
          initial="select_blood"
          onChangeOption={(val) => fieldsChangeHandler("bloodType", val)}
        />
        <View style={styles.body}>
          <Field
            value={fields.number}
            keyboardType="phone-pad"
            label="add_number"
            placeholder="example"
            onChangeText={(val) => fieldsChangeHandler("number", val)}
          />
          <Field
            placeholder="add_location"
            value={fields.location}
            disabled={true}
            accessoryRight={() => (
              <Icon
                name="md-arrow-forward"
                pack="ion"
                onPress={openMap}
                style={[styles.icon, { color: colors.inputText }]}
              />
            )}
          />
          <Field
            multiline={true}
            textStyle={{ minHeight: 110 }}
            placeholder="tell_more"
            onChangeText={(val) => fieldsChangeHandler("desc", val)}
          />
          <CustomBtn
            title="post"
            onPress={onSubmit}
            width={getWidthByPercents(80, 2)}
          />
        </View>
        <MapModal
          visible={isMapOpen}
          onSave={(coordinates) => {
            getLocationName(coordinates);
            setFields((field) => ({
              ...field,
              coordinates: [coordinates.latitude, coordinates.longitude],
            }));
            setIsMapOpen(false);
          }}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.1522,
            longitudeDelta: 0.1521,
          }}
          close={() => setIsMapOpen(false)}
        />
        {errorMsg && <CustomText>{errorMsg}</CustomText>}
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    zIndex: -1,
    width: "100%",
    alignItems: "center",
  },
  field: {
    marginBottom: 15,
  },
  icon: {
    height: 18,
    marginRight: 12,
  },
});
