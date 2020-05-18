import React from "react";

import { GameButton } from "../../components/GameButton/GameButton";

import { StyleSheet, View, Button, Text } from "react-native";

export const Rules = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Правила игры</Text>
      <Text style={styles.text}>
        Игрок и робот бросают по очереди два кубика.{"\n"}
        {"\n"} Если выпадает дубль (одинаковые цифры), то кубики бросаются снова
        до тех пор, пока не будет дубля.{"\n"}
        {"\n"} Цель игры - быстрее соперника набрать 50 очков.
      </Text>

      <GameButton
        title="Начать игру"
        onSubmit={() => navigation.navigate("Game")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 50,
    marginTop: -50,
  },
  text: {
    fontSize: 18,
    paddingHorizontal: "5%",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
