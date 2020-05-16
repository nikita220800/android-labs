import React, { useEffect, useState } from "react";
import { Picture } from "../components/Picture";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RotateRightPict from "../img/90right.png";
import RotateLeftPict from "../img/90left.png";
import CropPict from "../img/crop.png";
import FlipHorizPict from "../img/flipHoriz.png";
import FlipVerticPict from "../img/flipVertic.png";

export const EditorScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    console.log(route.params.photo);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.choosen}>Отмена</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.toEditor}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoControls}>
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
  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#3c3c3c",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    zIndex: 10,
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingVertical: 20,
  },
  choosen: {
    color: "#fff",
    fontSize: 20,
  },
  toEditor: {
    color: "#fff",
    fontSize: 20,
  },

  photoControls: {
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
