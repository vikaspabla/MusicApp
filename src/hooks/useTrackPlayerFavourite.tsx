import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import { useFavourites } from "../store/library";
import { useCallback } from "react";

export const useTrackPlayerFavourite = () => {
  const activeTrack = useActiveTrack();

  const { favourites, toggleTrackFavourite } = useFavourites();

  const isFavourite =
    favourites.find((track) => track.url === activeTrack?.url)?.rating === 1;

  const toggleFavourite = useCallback(async () => {
    const id = await TrackPlayer.getActiveTrackIndex();

    if (id == null) return;

    await TrackPlayer.updateMetadataForTrack(id, {
      rating: isFavourite ? 0 : 1,
    });

    if (activeTrack) {
      toggleTrackFavourite(activeTrack);
    }
  }, [isFavourite, toggleTrackFavourite, activeTrack]);

  return { isFavourite, toggleFavourite };
};
