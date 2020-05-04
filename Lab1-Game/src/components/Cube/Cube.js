import React from "react";

import { Dot } from "./Dot";

import { StyleSheet, View, ActivityIndicator } from "react-native";

export const Cube = ({ isLoading, dotsCount }) => {
  return (
    <View
      style={[
        styles.container,
        isLoading || dotsCount === 1 ? styles.centerDot : null,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : dotsCount === 1 ? (
        <Dot />
      ) : dotsCount === 2 ? (
        <>
          <View>
            <Dot />
          </View>
          <View style={styles.toRight}>
            <Dot />
          </View>
        </>
      ) : dotsCount === 3 ? (
        <>
          <View>
            <Dot />
          </View>
          <View style={styles.centerDot}>
            <Dot />
          </View>
          <View style={styles.toRight}>
            <Dot />
          </View>
        </>
      ) : dotsCount === 4 ? (
        <>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
        </>
      ) : dotsCount === 5 ? (
        <>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
          <View style={styles.centerDot}>
            <Dot />
          </View>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
        </>
      ) : dotsCount === 6 ? (
        <>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
          <View style={styles.dotsLine}>
            <Dot />
            <Dot />
          </View>
        </>
      ) : null}
    </View>
  );
};

Cube.defaultProps = {
  isLoading: false,
  dotsCount: 1,
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: "#000",
    borderRadius: 15,
    padding: 10,
    justifyContent: "space-between",
  },
  dotsLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  centerDot: {
    justifyContent: "center",
    alignItems: "center",
  },
});
