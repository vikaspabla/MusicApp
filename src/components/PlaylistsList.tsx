import { FlatList, FlatListProps, View, Text } from "react-native";
import { Playlist } from "../helpers/types";
import { utilsStyles } from "../styles";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { useMemo } from "react";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "../constants/image";
import { PlaylistListItem } from "./PlaylistListItem";
import { playListNameFilter } from "../helpers/filter";

type PlaylistsListProps = {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }}
  />
);

export const PlaylistsList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}: PlaylistsListProps) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in playlist",
    },
  });

  const filteredPlaylist = useMemo(() => {
    return playlists.filter(playListNameFilter(search));
  }, [playlists, search]);

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No playlist found</Text>

          <FastImage
            source={{
              uri: unknownTrackImageUri,
              priority: FastImage.priority.normal,
            }}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      data={filteredPlaylist}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem
          playlist={playlist}
          onPress={() => handlePlaylistPress(playlist)}
        />
      )}
      {...flatListProps}
    />
  );
};
