import React from "react";

import { GameButton } from "../../components/GameButton/GameButton";

import { StyleSheet, View, Text } from "react-native";

export const Result = ({ route, navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>
          {route.params.winner === "player"
            ? "Вы победили!"
            : "Бот победил! Вам повезёт в другой раз!"}
        </Text>
      </View>
      <GameButton
        title="Сыграть ещё раз"
        onSubmit={() => navigation.navigate("Game")}
      />
    </>
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
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
