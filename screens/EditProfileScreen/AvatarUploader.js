import React, { useState } from "react";
import {
  View,
  Alert,
  Platform,
  StyleSheet,
  ActionSheetIOS,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Image } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@react-navigation/native";

import { ModalWindow } from "./ModalWindow";
import { TCustomText, AvatarMaker } from "../../components";
import { selectPhoto, uploadPhoto, removeAvatar } from "../../store/auth";

const mapStateToProps = (state) => ({
  photo: selectPhoto(state),
});

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
};

export const AvatarUploader = connect(mapStateToProps, {
  uploadPhoto,
  removeAvatar,
})(({ photo, uploadPhoto, removeAvatar, fullname }) => {
  const [isEdit, setIsEdit] = useState(false);
  const selectImage = async (isCamera) => {
    try {
      const permission = await requestCameraPermissions();
      if (permission) {
        let image;
        if (isCamera)
          image = await ImagePicker.launchCameraAsync(imagePickerOptions);
        else
          image = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
        const { cancelled, uri } = image;
        if (!cancelled) uploadPhoto(uri);
      }
    } catch (error) {
      console.log("selectImageError: ", error);
    }
  };

  const takePhoto = () => {
    selectImage(true);
    setIsEdit(false);
  };

  const chooseFromGallery = () => {
    selectImage(false);
    setIsEdit(false);
  };

  const deleteHandler = () => {
    removeAvatar();
    setIsEdit(false);
  };

  const onPress = () => setIsEdit(!isEdit);
  const oniosPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "Take Photo",
          "Choose from Gallery",
          "Remove Current Photo",
        ],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) takePhoto();
        else if (buttonIndex === 2) chooseFromGallery();
        else if (buttonIndex === 3) deleteHandler();
      }
    );
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {photo ? (
        <Image
          source={{ uri: photo }}
          style={styles.photo}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{ backgroundColor: "#f2f4f8" }}
        />
      ) : (
        <View style={styles.photo}>{AvatarMaker(fullname, 45)}</View>
      )}
      <TouchableOpacity onPress={Platform.OS === "ios" ? oniosPress : onPress}>
        <TCustomText style={{ ...styles.text, ...{ color: colors.link } }}>
          change_photo
        </TCustomText>
      </TouchableOpacity>
      <ModalWindow
        visible={isEdit}
        onBackdropPress={() => setIsEdit(false)}
        takePhoto={takePhoto}
        chooseFromGallery={chooseFromGallery}
        deleteHandler={deleteHandler}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 80,
  },
  text: {
    fontSize: 16,
    color: "#6979f8",
    marginVertical: 10,
  },
});

async function requestCameraPermissions() {
  try {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") return true;
    else {
      Alert.alert(
        "Access denied",
        "Go to device settings and enable access",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      return false;
    }
  } catch (error) {
    Alert.alert(error.message);
  }
}
