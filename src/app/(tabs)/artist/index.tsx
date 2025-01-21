import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import React, { useMemo } from "react";
import { defaultStyles, utilsStyles } from "../../../styles";
import { useArtists } from "../../../store/library";
import { useNavigationSearch } from "../../../hooks/useNavigationSearch";
import { artistNameFilter } from "../../../helpers/filter";
import { screenPadding } from "../../../constants/tokens";
import FastImage from "react-native-fast-image";
import { unknownArtistImageUri } from "../../../constants/image";
import { Link } from "expo-router";

const ItemSeparatorComponent = () => {
  return (
    <View
      style={[
        utilsStyles.itemSeparator,
        { marginLeft: 50, marginVertical: 12 },
      ]}
    />
  );
};

const ArtistScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search Artists",
    },
  });

  const artists = useArtists();

  const filteredArtists = useMemo(() => {
    if (!search) return artists;

    return artists.filter(artistNameFilter(search));
  }, [search, artists]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <FlatList
          data={filteredArtists}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingTop: Platform.OS === "android" ? 120 : 10,
            paddingBottom: 20,
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ItemSeparatorComponent}
          ListEmptyComponent={
            <View>
              <Text>No Artists Found!</Text>
              <FastImage
                source={{
                  uri: unknownArtistImageUri,
                  priority: FastImage.priority.normal,
                }}
                style={utilsStyles.emptyContentImage}
              />
            </View>
          }
          renderItem={({ item: artist }) => {
            return (
              <Link href={`/artist/${artist.name}`} asChild>
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <FastImage
                        source={{
                          uri: unknownArtistImageUri,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.artistImage}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ArtistScreen;

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
  },
  artistImage: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: "80%",
  },
});
