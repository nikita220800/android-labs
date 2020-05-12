import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Game } from "./src/screens/Game/Game";
import { Rules } from "./src/screens/Rules/Rules";
import { Result } from "./src/screens/Result/Result";

import { Navbar } from "./src/components/Navbar/Navbar";
import { StyleSheet, SafeAreaView } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Navbar title="Кубики с ботом" />
        <Stack.Navigator headerMode="none" initialRouteName="Rules">
          <Stack.Screen name="Rules" component={Rules} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
