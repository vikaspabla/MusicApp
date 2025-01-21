import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "../../../styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "../../../constants/layout";
import { colors } from "../../../constants/tokens";

const PlaylistScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Playlist",
            headerTitleStyle: {
              ...(Platform.OS === "android" && { fontSize: 35 }),
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="[name]"
          options={{
            headerTitle: "",
            headerBackVisible: true,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: colors.background,
            },

            headerTintColor: colors.primary,
          }}
        />
      </Stack>
    </View>
  );
};

export default PlaylistScreenLayout;
