import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { defaultStyles } from "../../../styles";
import { ScrollView } from "react-native-gesture-handler";
import library from "../../../../assets/data/library.json";
import { useNavigationSearch } from "../../../hooks/useNavigationSearch";
import TrackList from "../../../components/TrackList";
import { screenPadding } from "../../../constants/tokens";
import { trackTitleFilter } from "../../../helpers/filter";
import { useFavourites } from "../../../store/library";
import { generateTracksListId } from "../../../helpers/miscellaneous";

const FavouritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search Songs",
    },
  });

  const favouriteTracks = useFavourites().favourites;

  const filteredFavouriteTracks = useMemo(() => {
    if (!search) return favouriteTracks;

    return favouriteTracks.filter(trackTitleFilter(search));
  }, [search, favouriteTracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TrackList
          id={generateTracksListId("favourites", search)}
          scrollEnabled={false}
          tracks={filteredFavouriteTracks}
        />
      </ScrollView>
    </View>
  );
};

export default FavouritesScreen;
