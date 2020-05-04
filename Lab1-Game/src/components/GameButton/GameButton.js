import React from "react";

import { Button, View, StyleSheet } from "react-native";

export const GameButton = ({ title, onSubmit, disabled }) => {
  const pressHandler = () => {
    onSubmit();
  };
  return (
    <View style={styles.btnContainer}>
      <Button
        title={title}
        style={styles.btn}
        key={"play"}
        onPress={pressHandler}
        disabled={disabled}
      />
    </View>
  );
};

GameButton.defaultProps = {
  disabled: false,
  title: "Кнопка",
};

const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingHorizontal: "20%",
    marginBottom: 20,
    width: "100%",
  },
  btn: {},
});
