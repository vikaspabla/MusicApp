import { useLocalSearchParams, useRouter } from "expo-router";
import TrackPlayer, { Track } from "react-native-track-player";
import { usePlaylist, useTracks } from "../../store/library";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlaylistsList } from "../../components/PlaylistsList";
import { Playlist } from "../../helpers/types";
import { useQueue } from "../../store/queue";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "../../styles";
import { screenPadding } from "../../constants/tokens";
import { StyleSheet } from "react-native";

const AddToPlaylistModal = () => {
  const router = useRouter();

  const headerHeight = useHeaderHeight();

  const { activeQueueId } = useQueue();

  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track["url"] }>();

  const tracks = useTracks();

  const { playlist, addToPlaylist } = usePlaylist();

  const track = tracks.find((currentTrack) => trackUrl === currentTrack.url);

  if (!track) {
    return null;
  }

  const availablePlaylists = playlist.filter(
    (playlist) =>
      !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url)
  );

  const handplePlaylistsPress = async (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);

    router.dismiss();

    if (activeQueueId?.startsWith(playlist.name)) {
      await TrackPlayer.add(track);
    }
  };

  return (
    <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
      <PlaylistsList
        playlists={availablePlaylists}
        onPlaylistPress={handplePlaylistsPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
  },
});

export default AddToPlaylistModal;
