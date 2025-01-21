import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ViewProps,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Track, useActiveTrack } from "react-native-track-player";
import { unknownTrackImageUri } from "../constants/image";
import { defaultStyles } from "../styles";
import { fontSize } from "../constants/tokens";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import { useLastActiveTrack } from "../hooks/useLastActiveTrack";
import { MovingText } from "./MovingText";
import { useRouter } from "expo-router";
import React from "react";

export const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();

  const activeTrack = useActiveTrack();

  const lastActiveTrack = useLastActiveTrack();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handlePress = () => {
    router.navigate("/player");
  };

  if (!displayedTrack) return null;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={[styles.container, style]}
    >
      <>
        <FastImage
          source={{
            uri: displayedTrack.thumbnail ?? unknownTrackImageUri,
          }}
          style={styles.trackArtworkImage}
        />
        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitle}
            text={displayedTrack.title ?? ""}
            animationThreshold={25}
          ></MovingText>
        </View>

        <View style={styles.trackControlsContainer}>
          <PlayPauseButton iconSize={24} />
          <SkipToNextButton iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
    maxWidth: "90%",
  },
});
