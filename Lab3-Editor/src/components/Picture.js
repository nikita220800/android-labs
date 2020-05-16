import React from "react";

import { View, Image, StyleSheet } from "react-native";

export const Picture = ({ onClick, imgUrl, style }) => {
  return (
    <View style={[styles.container, style]} onPress={onClick}>
      <Image source={imgUrl} style={styles.image} />
    </View>
  );
};

Picture.defaultProps = {
  style: null,
  imgUrl: undefined,
  onClick: undefined,
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
});
