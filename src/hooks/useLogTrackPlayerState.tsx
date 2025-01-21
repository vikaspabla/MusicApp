import { Event, useTrackPlayerEvents } from "react-native-track-player";

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

export const useLogtrackPlayerState = () => {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An Error Occured: ", event);
    }

    if (event.type === Event.PlaybackState) {
      console.log("Playback State: ", event.state);
    }

    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log("Track Changed: ", event.index);
    }
  });
};
