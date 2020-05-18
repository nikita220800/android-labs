import React, { useEffect, useState, useRef } from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const Item = ({ photo, onSelect, selected }) => {
  const [smallPict, setSmallPict] = useState(null);

  const mountedRef = useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        mountedRef.current = false;
        setSmallPict(null);
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      try {
        const manipResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 150 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        if (!mountedRef.current) return null;
        setSmallPict(manipResult);
      } catch (e) {}
    })();
  }, []);
  return (
    <TouchableOpacity style={styles.photo} onPress={() => onSelect(photo)}>
      <View style={styles.photo}>
        {selected ? <View style={styles.photoSelected} /> : null}
        {smallPict !== null ? (
          <Image
            source={smallPict}
            style={
              smallPict.width > smallPict.height
                ? styles.imageHorizontal
                : styles.imageVertical
            }
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export const GalleryScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [photosAreReady, setPhotosAreReady] = useState(false);
  const [selected, setSelected] = React.useState({ id: null });

  const loadPhotos = () => {
    if (photos === null) {
      (async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== "granted") {
          const newPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (newPermission.status === "granted") {
            const result = await MediaLibrary.getAlbumsAsync();
            setAlbums(result);
          }
        } else {
          const result = await MediaLibrary.getAlbumsAsync();
          setAlbums(result);
        }
      })();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPhotos();
      return () => {
        setPhotosAreReady(false);
        setPhotos(null);
        setSelected({ id: null });
      };
    }, [])
  );

  useEffect(() => {
    if (albums !== null) {
      let photosArray = [];
      (async () => {
        for (const album of albums) {
          if (album.id !== null) {
            let options = {
              album: album.id,
            };
            const result = await MediaLibrary.getAssetsAsync(options);
            for (const photoObject of result.assets) {
              if (photoObject.mediaType === "photo") {
                const photo = {
                  id: photoObject.id,
                  albumId: photoObject.albumId,
                  filename: photoObject.filename,
                  width: photoObject.width,
                  height: photoObject.height,
                  uri: photoObject.uri,
                };
                photosArray.push(photo);
              }
            }
          }
        }
        setPhotos(photosArray);
      })();
    }
  }, [albums]);

  useEffect(() => {
    if (photos !== null) {
      setTimeout(() => {
        setPhotosAreReady(true);
      }, 500);
    }
  }, [photos]);

  const onSelect = React.useCallback(
    (photo) => {
      setSelected((prev) => (prev.id !== photo.id ? photo : { id: null }));
    },
    [selected]
  );

  return (
    <View style={styles.container}>
      {photosAreReady ? (
        <View style={styles.header}>
          <Text style={styles.choosen}>
            {selected.id !== null
              ? "Выбрано " + selected.filename.slice(0, 10) + "..."
              : "Выберите фото"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (selected.id !== null)
                navigation.navigate("EditorScreen", {
                  photo: selected,
                });
            }}
          >
            <Text style={styles.toEditor}>Далее</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {!photosAreReady ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={photos}
          horizontal={false}
          numColumns={3}
          initialNumToRender={20}
          contentContainerStyle={{
            alignItems: "center",
          }}
          style={styles.scrollContainer}
          renderItem={({ item, index, separators }) => (
            <Item
              photo={item}
              selected={selected.id === item.id}
              onSelect={onSelect}
            />
          )}
          keyExtractor={(item, index) =>
            "key" + item.id + index + ":" + item.filename
          }
          extraData={selected}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
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
  scrollContainer: {
    marginTop: 80,
    width: "100%",
    height: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  photo: {
    overflow: "hidden",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: "#3c3c3c",
  },

  photoSelected: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(7, 87, 184, 0.7)",
    zIndex: 2,
  },
  imageVertical: {
    width: "100%",
  },
  imageHorizontal: {
    height: "100%",
  },
});
