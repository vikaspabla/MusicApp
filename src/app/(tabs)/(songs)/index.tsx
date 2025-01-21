// import { ScrollView, View } from "react-native";
// import React, { useMemo } from "react";
// import { defaultStyles } from "../../../styles";
// import TrackList from "../../../components/TrackList";
// import { useNavigationSearch } from "../../../hooks/useNavigationSearch";
// import { screenPadding } from "../../../constants/tokens";
// import library from "../../../../assets/data/library.json";
// import { trackTitleFilter } from "../../../helpers/filter";
// import { useTracks } from "../../../store/library";
// import { generateTracksListId } from "../../../helpers/miscellaneous";
// import SearchBar from "../../../components/searchbar";

// const SongsScreen = () => {
//   const search = useNavigationSearch({
//     searchBarOptions: {
//       placeholder: "Search Songs",
//     },
//   });

//   const tracks = useTracks();

//   const filteredTracks = useMemo(() => {
//     if (!search) return tracks;

//     return tracks.filter(trackTitleFilter(search));
//   }, [search, tracks]);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Search term: ", searchTerm);
//   };

//   return (
//     <View style={defaultStyles.container}>
//       <SearchBar onSearch={handleSearch} style={{ backgroundColor: "red" }} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={{ paddingHorizontal: screenPadding.horizontal }}
//       >
//         <TrackList
//           id={generateTracksListId("songs", search)}
//           tracks={filteredTracks}
//           scrollEnabled={false}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default SongsScreen;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { defaultStyles, utilsStyles } from "../../../styles"; // Importing the existing defaultStyles
import SearchBar from "../../../components/searchbar";
import FastImage from "react-native-fast-image"; // Using FastImage for optimized image loading
import { screenPadding } from "../../../constants/tokens";
import TrackList from "../../../components/TrackList";
import { generateTracksListId } from "../../../helpers/miscellaneous";

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

const SongsScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [songs, setSongs] = useState<any[]>([]);

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);

    try {
      const res = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await res.json();
      setSongs(data); // Store the search results in the state
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

  // return (
  //   <View style={defaultStyles.container}>
  //     {/* SearchBar outside the ScrollView */}
  //     <SearchBar
  //       onSearch={handleSearch} // Function to handle search
  //       style={{
  //         backgroundColor: "transparent", // Keep it transparent to match header style
  //         paddingHorizontal: screenPadding.horizontal, // Add consistent padding
  //         marginBottom: 10, // Space between SearchBar and TrackList
  //       }}
  //     />
  //     <ScrollView
  //       style={{ paddingHorizontal: screenPadding.horizontal }}
  //       contentInsetAdjustmentBehavior="automatic"
  //     >
  //       <TrackList
  //         id={generateTracksListId("songs", searchTerm)}
  //         scrollEnabled={false}
  //         tracks={songs}
  //       />
  //     </ScrollView>
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View
        style={[
          defaultStyles.container,
          { paddingHorizontal: screenPadding.horizontal },
        ]}
      >
        <SearchBar
          onSearch={handleSearch} // Function to handle search
          style={{
            backgroundColor: "transparent",
          }}
        />
        {/* Replace FlatList with TrackList */}
        <TrackList
          id={generateTracksListId("songs", searchTerm)} // Generate a unique ID for the TrackList
          tracks={songs} // Use the songs data
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Ensures the SafeAreaView fills the screen
  },
  container: {
    flex: 1,
    paddingTop: 0, // Minimal space from the top
    paddingHorizontal: 20, // Horizontal padding for alignment
    justifyContent: "flex-start", // Align content to the top
    alignItems: "flex-start", // Align items to the left
  },
  // songItemContainer: {
  //   flexDirection: "row",
  //   alignItems: "center", // Align the image and text horizontally
  //   paddingRight: 200,
  //   marginBottom: 12,
  //   backgroundColor: "transparent",
  //   borderRadius: 8,
  //   padding: 10,
  // },
  // songThumbnail: {
  //   borderRadius: 8,
  //   width: 50,
  //   height: 50,
  //   marginRight: 14, // Adds some space between the image and the text
  // },
  // songInfoContainer: {
  //   alignItems: "flex-start",
  // },
  // songTitle: {
  //   color: "white",
  //   fontSize: 16,
  //   fontWeight: "600", // Makes the title bold
  //   marginBottom: 4, // Adds space between title and artist
  // },
  // songArtist: {
  //   color: "#ccc", // Lighter color for the artist name
  //   fontSize: 14,
  // },
});

export default SongsScreen;
