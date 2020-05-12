import React from "react";

import RobotImg from "../../img/robot.png";

import { View, Image, StyleSheet } from "react-native";

export const RobotPicture = () => {
  return (
    <View style={styles.container}>
      <Image source={RobotImg} style={styles.image} />
    </View>
  );
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
