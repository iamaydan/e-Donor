import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@ui-kitten/components";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Modal, Alert, View } from "react-native";

export const MapModal = ({ onSave, close, visible, initialRegion, type }) => {
  const isStatic = type === "static";
  const [markerCoordinates, setMarkerCoordinates] = useState(
    isStatic ? { ...initialRegion } : null
  );

  const saveHandler = () => {
    if (markerCoordinates) {
      onSave(markerCoordinates);
    } else {
      Alert.alert("Choose location", "For save you need set location first");
    }
  };

  const startCoordinates = {
    ...initialRegion,
    latitude: initialRegion.latitude || 50.446584,
    longitude: initialRegion.longitude || 30.521744,
  };
  return (
    <Modal visible={visible} animationType="slide">
      <StatusBar hidden={true} />
      <MapView
        style={styles.map}
        initialRegion={{
          ...startCoordinates,
        }}
        onPress={(e) => {
          isStatic
            ? setMarkerCoordinates(initialRegion)
            : setMarkerCoordinates(e.nativeEvent.coordinate);
        }}
      >
        {markerCoordinates && <Marker coordinate={markerCoordinates} />}
      </MapView>
      <View style={styles.top}>
        <Icon
          name="md-arrow-back"
          pack="ion"
          style={styles.icon}
          onPress={close}
        />
        {onSave && (
          <Icon
            name="ios-save"
            pack="ion"
            style={styles.icon}
            onPress={saveHandler}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  top: {
    top: 20,
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  icon: {
    color: "#000",
    height: 25,
  },
});
