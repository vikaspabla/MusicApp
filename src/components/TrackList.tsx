import {
  FlatList,
  FlatListProps,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TrackListItem from "./TrackListItem";
import { utilsStyles } from "../styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { useRef } from "react";
import { useQueue } from "../store/queue";
import { QueueControls } from "./QueueControls";

export type TrackListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

const ItemDivider = () => {
  return (
    <View
      style={{
        ...utilsStyles.itemSeparator,
        marginVertical: 9,
        marginLeft: 60,
      }}
    />
  );
};

export const TrackList = ({
  id,
  hideQueueControls = false,
  tracks,
  ...flatlistProps
}: TrackListProps) => {
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );

    if (trackIndex === -1) return;

    try {
      // Send the track URL to the backend to get the audio URL
      const response = await fetch("http://localhost:3000/track/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackUrl: selectedTrack.url, // Send the track URL to the backend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio URL");
      }

      const data = await response.json();
      const audioUrl = data.audioUrl;

      // Now update the track with the new audio URL
      selectedTrack.url = audioUrl;

      // Proceed with the rest of the queue handling logic
      //   const isChangingQueue = id != activeQueueId;

      //   if (isChangingQueue) {
      //     const beforeTracks = tracks.slice(0, trackIndex);
      //     const afterTracks = tracks.slice(trackIndex + 1);

      //     await TrackPlayer.reset();

      //     await TrackPlayer.add(selectedTrack); // Add the track with the updated URL
      //     await TrackPlayer.add(afterTracks);
      //     await TrackPlayer.add(beforeTracks);

      //     await TrackPlayer.play();

      //     queueOffset.current = trackIndex;
      //     setActiveQueueId(id);
      //   } else {
      //     const nextTrackIndex =
      //       trackIndex - queueOffset.current < 0
      //         ? tracks.length + trackIndex - queueOffset.current
      //         : trackIndex - queueOffset.current;

      //     await TrackPlayer.skip(nextTrackIndex);
      //     await TrackPlayer.play();
      //   }
      // } catch (error) {
      //   console.error("Error handling track select:", error);
      // }

      // Play the selected track immediately without queue logic
      await TrackPlayer.reset(); // Clear the current track
      await TrackPlayer.add(selectedTrack); // Add the new track
      await TrackPlayer.play(); // Start playing
    } catch (error) {
      console.error("Error handling track select:", error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
        ListHeaderComponent={
          !hideQueueControls ? (
            <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
          ) : undefined
        }
        ListFooterComponent={ItemDivider}
        ItemSeparatorComponent={ItemDivider}
        ListEmptyComponent={
          <View>
            <Text style={utilsStyles.emptyContentText}>No Songs Found</Text>
          </View>
        }
        renderItem={({ item: track }) => {
          console.log(track); // Log the track to check if title exists
          return (
            <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
          );
        }}
        {...flatlistProps}
      />
    </View>
  );
};

export default TrackList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 130 : 0,
    marginLeft: Platform.OS === "android" ? 10 : 5,
  },
});
