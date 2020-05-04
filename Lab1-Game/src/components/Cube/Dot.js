import React from "react";

import { StyleSheet, View } from "react-native";

export const Dot = ({ style }) => {
  return <View style={[styles.dot, style]} />;
};

Dot.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000",
  },
});
