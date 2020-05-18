import React, { useState, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TakePhotoPict from "../img/takephoto.png";
import SwitchCamPict from "../img/switchCam.png";
import GalleryPict from "../img/gallery.png";
import { Picture } from "../components/Picture";
import { Camera } from "expo-camera";

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camIsReady, setCamIsReady] = useState(false);
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      setTakePhotoClicked(false);
      return () => {
        setTimeout(() => {
          setPhoto(null);
          setTakePhotoClicked(false);
        }, 200);
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      const permission = await Permissions.getAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      if (permission.status !== "granted") {
        const newPermission = await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.CAMERA_ROLL
        );
        if (newPermission.status === "granted") {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === "granted");
        }
      } else {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  useEffect(() => {
    if (photo !== null) {
      (async () => {
        await MediaLibrary.saveToLibraryAsync(photo.uri);

        navigation.navigate("CheckPhotoScreen", {
          photo: photo,
        });
      })();
    }
  }, [photo]);

  const takePhoto = async () => {
    const CamOptions = {
      quality: 0.5,
      base64: false,
      exif: true,
      onPictureSaved: (data) => {
        setPhoto(data);
      },
      skipProcessing: true,
    };
    await camera.current.takePictureAsync(CamOptions);
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      {!camIsReady ? <View style={styles.waitCamReady} /> : null}
      {takePhotoClicked ? (
        <View style={styles.waitPhotoReady}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={camera}
        ratio={"16:9"}
        onCameraReady={() => setCamIsReady(true)}
      />
      <View style={styles.cameraControls}>
        <TouchableOpacity
          onPress={() => {
            if (!takePhotoClicked) {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }
          }}
        >
          <Picture imgUrl={SwitchCamPict} style={styles.imageSmall} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (!takePhotoClicked) {
              setTakePhotoClicked(true);
              takePhoto();
            }
          }}
        >
          <Picture imgUrl={TakePhotoPict} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GalleryScreen");
          }}
        >
          <Picture imgUrl={GalleryPict} style={styles.imageSmall} />
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
  waitCamReady: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "#000",
    zIndex: 5,
  },
  waitPhotoReady: {
    width: "100%",
    height: "90%",
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
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
