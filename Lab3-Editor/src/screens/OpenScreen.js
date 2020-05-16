import React from "react";

import CameraPict from "../img/camera.png";

import EditorPict from "../img/editor.png";

import { Picture } from "../components/Picture";

import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export const OpenScreen = ({ navigation }) => {
  const goTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Easy Photo Editor</Text>
      <View style={styles.linksContainer}>
        <TouchableWithoutFeedback onPress={() => goTo("CameraScreen")}>
          <View style={styles.link}>
            <Picture imgUrl={CameraPict} style={styles.image} />
            <Text style={styles.linkText}>Сделать фото</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goTo("GalleryScreen")}>
          <View style={styles.link}>
            <Picture imgUrl={EditorPict} style={styles.image} />
            <Text style={styles.linkText}>Редактор</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  header: {
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  link: {
    width: 100,
  },
  image: {
    height: 80,
    marginBottom: 10,
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
