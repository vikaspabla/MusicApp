import { View, StyleSheet, Text } from "react-native";
import { defaultStyles, utilsStyles } from "../styles";
import { screenPadding, colors, fontSize } from "../constants/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { ActivityIndicator } from "react-native-paper";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "../constants/image";
import { MovingText } from "../components/MovingText";
import { PlayerControls } from "../components/PlayerControls";
import { PlayerProgressBar } from "../components/PlayerProgressBar";
import { PlayerVolumeBar } from "../components/PlayerVolumeBar";
import { PlayerRepeatToggle } from "../components/PlayerRepeatToggle";
import { LinearGradient } from "expo-linear-gradient";
import { usePlayerBackground } from "../hooks/usePlayerbackground";
import { FontAwesome } from "@expo/vector-icons";
import { useTrackPlayerFavourite } from "../hooks/useTrackPlayerFavourite";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { imageColors } = usePlayerBackground(
    activeTrack?.thumbnail ?? unknownTrackImageUri
  );

  const { top, bottom } = useSafeAreaInsets();

  const { isFavourite, toggleFavourite } = useTrackPlayerFavourite();

  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        imageColors
          ? [
              imageColors.background || colors.background,
              imageColors.primary || colors.primary || colors.background,
            ]
          : [colors.background, colors.background] // Use the same default color twice
      }
    >
      <View style={styles.overlayContainer}>
        <DissmissPlayerSymbol />
        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <FastImage
              source={{
                uri: activeTrack.thumbnail ?? unknownTrackImageUri,
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={styles.artworkImage}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={activeTrack.title ?? ""}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>
                  <FontAwesome
                    name={isFavourite ? "heart" : "heart-o"}
                    size={24}
                    color={isFavourite ? colors.primary : colors.icon}
                    style={{ marginHorizontal: 14, marginTop: 4 }}
                    onPress={toggleFavourite}
                  />
                </View>

                <Text
                  numberOfLines={1}
                  style={[styles.trackArtistText, { marginTop: 6 }]}
                >
                  {activeTrack.artist ? activeTrack.artist : ""}
                </Text>
              </View>

              <PlayerProgressBar style={{ marginTop: 32 }} />
              <PlayerControls style={{ marginTop: 40 }} />
            </View>

            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
            <View style={utilsStyles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{ marginTop: 6 }} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const DissmissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "#fff",
          opacity: 0.7,
        }}
      />
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});
