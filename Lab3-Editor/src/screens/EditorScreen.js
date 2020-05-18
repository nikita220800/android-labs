import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import ImageManipulator from "../components/manipulator/ImageManipulator";

export const EditorScreen = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [uri, setUri] = useState(null);

  const { width, height } = Dimensions.get("window");

  useFocusEffect(
    React.useCallback(() => {
      setPhoto(route.params.photo);
      return () => {
        setUri(null);
        setIsSaving(false);
      };
    }, [])
  );

  const onToggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const savingPict = async () => {
    setIsSaving(true);
    const asset = await MediaLibrary.createAssetAsync(uri.uri);
    const easyAlbum = await MediaLibrary.getAlbumAsync("easyEditor");
    if (easyAlbum === null) {
      await MediaLibrary.createAlbumAsync("easyEditor", asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync(asset, easyAlbum, false);
    }
    navigation.push("OpenScreen", { photo_saved: true });
  };

  return (
    <View style={styles.container}>
      {uri ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OpenScreen");
              }}
            >
              <Text style={styles.choosen}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                savingPict();
              }}
            >
              <Text style={styles.toEditor}>Сохранить</Text>
            </TouchableOpacity>
          </View>
          {isSaving ? (
            <View style={styles.loaderAbs}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}
          <Image
            resizeMode="contain"
            style={{
              width,
              height,
              marginBottom: 40,
            }}
            source={uri}
          />
        </>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {photo !== null ? (
        <ImageManipulator
          photo={photo}
          isVisible={isVisible}
          onPictureChoosed={(data) => {
            setUri(data);
          }}
          onToggleModal={onToggleModal}
          onExit={() => {
            navigation.navigate("OpenScreen");
          }}
          saveOptions={{
            compress: 1,
            format: "png",
            base64: false,
          }}
          btnTexts={{
            done: "Ок",
            crop: "Обрезать",
            processing: "Загрузка",
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loaderAbs: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
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
