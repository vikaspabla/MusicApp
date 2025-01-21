import { Redirect, useLocalSearchParams } from "expo-router";
import { usePlaylist } from "../../../store/library";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenPadding } from "../../../constants/tokens";
import { PlaylistTracksList } from "../../../components/PlaylistTracksList";

const PlaylistDetailsScreen = () => {
  const { name: playlistName } = useLocalSearchParams<{ name: string }>();

  const { playlist } = usePlaylist();

  const selectedPlaylist = playlist.find((pl) => pl.name === playlistName);

  if (!selectedPlaylist) {
    console.warn(`Playlist ${playlistName} not found`);
    return <Redirect href={"/(tabs)/playlist"} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <PlaylistTracksList playlist={selectedPlaylist} />
      </ScrollView>
    </View>
  );
};

export default PlaylistDetailsScreen;
