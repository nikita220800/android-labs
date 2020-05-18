import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraScreen } from "./src/screens/CameraScreen";
import { GalleryScreen } from "./src/screens/GalleryScreen";
import { EditorScreen } from "./src/screens/EditorScreen";
import { CheckPhotoScreen } from "./src/screens/CheckPhotoScreen";
import { OpenScreen } from "./src/screens/OpenScreen";

import { StyleSheet, SafeAreaView } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator headerMode="none" initialRouteName="OpenScreen">
          <Stack.Screen
            name="OpenScreen"
            component={OpenScreen}
            initialParams={{ photo_saved: false }}
          />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
          <Stack.Screen name="CheckPhotoScreen" component={CheckPhotoScreen} />
          <Stack.Screen name="EditorScreen" component={EditorScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
