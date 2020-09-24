import React from "react";
import { Modal } from "@ui-kitten/components";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

import { TCustomText, CustomBtn } from "../../components";
import { getWidthByPercents } from "../../utils/getWidthByPercents";

const { height } = Dimensions.get("screen");

export const ModalWindow = ({ visible, onBackdropPress, onPress }) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onBackdropPress}
    >
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <TCustomText style={styles.text}>terms_text</TCustomText>
          <CustomBtn
            title="accept"
            style={{ borderWidth: 0 }}
            width={getWidthByPercents(80, 2)}
            onPress={onPress}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: getWidthByPercents(95, 2),
    height: height * 0.7,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    padding: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    paddingBottom: 50,
  },
  // button: {
  //   backgroundColor: "red",
  //   width: 170,
  //   borderRadius: 12,
  // },
});
