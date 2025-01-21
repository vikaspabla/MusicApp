import { PropsWithChildren } from "react";
import TrackPlayer, { Track } from "react-native-track-player";

import { match } from "ts-pattern";
import { useFavourites } from "../store/library";
import { useQueue } from "../store/queue";
import { useRouter } from "expo-router";
import { MenuView } from "@react-native-menu/menu";

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

const router = useRouter();

export const TrackShortcutsMenu = ({
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const isFavourite = track.rating === 1;

  const { toggleTrackFavourite } = useFavourites();

  const { activeQueueId } = useQueue();

  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favourites", async () => {
        toggleTrackFavourite(track);

        // If the track is not in favourites, add it
        if (activeQueueId?.startsWith("favourites")) {
          await TrackPlayer.add(track);
        }
      })
      .with("remove-from-favourites", async () => {
        toggleTrackFavourite(track);

        // If the track is in favourites, remove it
        if (activeQueueId?.startsWith("favourites")) {
          const queue = await TrackPlayer.getQueue();

          const trackToRemove = queue.findIndex(
            (queueTrack) => queueTrack.url === track.url
          );

          await TrackPlayer.remove(trackToRemove);
        }
      })
      .with("add-to-playlist", () => {
        router.push({
          pathname: "/(modals)/addToPlaylist",
          params: { trackUrl: track.url },
        });
      })
      .otherwise(() => console.warn(`Unknown Menu Action ${id}`));
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isFavourite ? "remove-from-favourites" : "add-to-favourites",
          title: isFavourite ? "Remove from Favourites" : "Add to Favourites",
          image: isFavourite ? "star.fill" : "star",
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: "plus",
        },
      ]}
    >
      {children}
    </MenuView>
  );
};
