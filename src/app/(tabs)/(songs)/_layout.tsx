import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "../../../styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "../../../constants/layout";

const SongsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Songs",
            headerTitleStyle: {
              ...(Platform.OS === "android" && { fontSize: 35 }),
              fontWeight: "bold",
            },
          }}
        />
      </Stack>
    </View>
  );
};

export default SongsScreenLayout;
