import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Modal } from "@ui-kitten/components";

import { TCustomText } from "../../components";
import { getWidthByPercents } from "./../../utils/getWidthByPercents";

export const ModalWindow = ({
  visible,
  onBackdropPress,
  takePhoto,
  chooseFromGallery,
  deleteHandler,
}) => {
  const DUMMY = [
    { title: "take_photo", onPress: takePhoto },
    { title: "choose_from_gallery", onPress: chooseFromGallery },
    { title: "remove_photo", onPress: deleteHandler },
    { title: "cancel", onPress: onBackdropPress },
  ];

  return (
    <Modal
      visible={visible}
      onBackdropPress={onBackdropPress}
      backdropStyle={{ backgroundColor: "rgba(0,0,0,.6)" }}
      style={styles.modal}
    >
      {DUMMY.map((item) => (
        <TouchableOpacity key={item.title} onPress={item.onPress}>
          <TCustomText style={styles.btnText}>{item.title}</TCustomText>
        </TouchableOpacity>
      ))}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 15,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 15,
    width: getWidthByPercents(80, 2),
    height: "30%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  btnText: {
    color: "#009ACD",
    textTransform: "none",
    paddingVertical: 5,
  },
});
