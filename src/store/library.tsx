import { Track } from "react-native-track-player";
import { Artist, Playlist, TrackWithPlaylist } from "../helpers/types";
import { create } from "zustand";
import library from "../../assets/data/library.json";
import { useMemo } from "react";
import { unknownTrackImageUri } from "../constants/image";

interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavourite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,
  toggleTrackFavourite: (track) =>
    set((state) => ({
      tracks: state.tracks.map((currentTrack) => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            rating: currentTrack.rating === 1 ? 0 : 1,
          };
        }
        return currentTrack;
      }),
    })),

  addToPlaylist: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavourites = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const favourites = useMemo(
    () => tracks.filter((track) => track.rating === 1),
    [tracks]
  );

  const toggleTrackFavourite = useLibraryStore(
    (state) => state.toggleTrackFavourite
  );

  return { favourites, toggleTrackFavourite };
};

export const useArtists = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const artists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);

      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        acc.push({
          name: track.artist ?? "Unknown",
          tracks: [track],
        });
      }

      return acc;
    }, [] as Artist[]);
  }, [tracks]); // Recalculate only when `tracks` changes

  return artists;
};

export const usePlaylist = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const playlist = useMemo(() => {
    return tracks.reduce((acc, track) => {
      track.playlist?.forEach((playlistName) => {
        const existingPlaylist = acc.find(
          (playlist) => playlist.name === playlistName
        );

        if (existingPlaylist) {
          existingPlaylist.tracks.push(track);
        } else {
          acc.push({
            name: playlistName,
            artworkPreview: track.artwork ?? unknownTrackImageUri,
            tracks: [track],
          });
        }
      });
      return acc;
    }, [] as Playlist[]);
  }, [tracks]);

  const addToPlaylist = useLibraryStore((state) => state.addToPlaylist);

  return { playlist, addToPlaylist };
};
