import React, { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import CameraPict from "../img/camera.png";

import EditorPict from "../img/editor.png";

import { Picture } from "../components/Picture";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const OpenScreen = ({ navigation, route }) => {
  const [saveAlert, setSaveAlert] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params !== undefined) {
        if (route.params.photo_saved === true) {
          setSaveAlert(true);
          setTimeout(() => {
            setSaveAlert(false);
            navigation.setParams({ photo_saved: false });
          }, 1500);
        }
      }
      return () => {};
    }, [])
  );

  const goTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Easy Photo Editor</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => goTo("CameraScreen")}>
          <View style={styles.link}>
            <Picture imgUrl={CameraPict} style={styles.image} />
            <Text style={styles.linkText}>Сделать фото</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goTo("GalleryScreen")}>
          <View style={styles.link}>
            <Picture imgUrl={EditorPict} style={styles.image} />
            <Text style={styles.linkText}>Редактор</Text>
          </View>
        </TouchableOpacity>
      </View>
      {saveAlert ? (
        <View style={styles.saveAlertContainer}>
          <View style={styles.saveAlert}>
            <Text style={styles.saveAlertText}>
              Фотография сохранена в галерее
            </Text>
          </View>
        </View>
      ) : null}
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
  saveAlertContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  saveAlert: {
    width: "90%",
    padding: 10,
    paddingVertical: 20,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 8,
  },
  saveAlertText: {
    color: "#fff",
  },
});
