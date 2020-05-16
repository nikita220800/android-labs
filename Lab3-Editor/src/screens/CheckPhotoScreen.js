import React from "react";
import { Picture } from "../components/Picture";
import CheckPict from "../img/check.png";
import ClosePict from "../img/close.png";

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

export const CheckPhotoScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.photoPreview}>
        <Image source={route.params.photo} style={styles.photoPreviewImg} />
      </View>
      <View style={styles.cameraControls}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CameraScreen");
          }}
        >
          <Picture imgUrl={ClosePict} style={styles.imageSmall} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditorScreen", {
              photo: route.params.photo,
            });
          }}
        >
          <Picture imgUrl={CheckPict} style={styles.imageSmall} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  photoPreview: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
    height: "85%",
  },
  photoPreviewImg: {
    height: "100%",
    maxWidth: "100%",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
    paddingVertical: 20,
    zIndex: 3,
  },
  image: {
    width: 100,
    height: 80,
  },
  imageSmall: {
    width: 100,
    height: 50,
  },
});
