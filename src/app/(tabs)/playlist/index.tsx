// import {
//   FlatList,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from "react-native";
// import React, { useMemo } from "react";
// import { defaultStyles, utilsStyles } from "../../../styles";
// import { ScrollView } from "react-native-gesture-handler";
// import { screenPadding } from "../../../constants/tokens";
// import { useNavigationSearch } from "../../../hooks/useNavigationSearch";
// import { usePlaylist } from "../../../store/library";
// import { play } from "react-native-track-player/lib/src/trackPlayer";
// import { playListNameFilter } from "../../../helpers/filter";
// import { Link, useRouter } from "expo-router";
// import { Playlist } from "../../../helpers/types";
// import FastImage from "react-native-fast-image";
// import { unknownTrackImageUri } from "../../../constants/image";
// import { Ionicons } from "@expo/vector-icons";
// import { PlaylistsList } from "../../../components/PlaylistsList";

// const PlaylistsScreen = () => {
//   const router = useRouter();

//   const search = useNavigationSearch({
//     searchBarOptions: {
//       placeholder: "Find in playlists",
//     },
//   });

//   const { playlist } = usePlaylist();

//   const filteredPlaylists = useMemo(() => {
//     return playlist.filter(playListNameFilter(search));
//   }, [playlist, search]);

//   const handlePlaylistPress = (playlist: Playlist) => {
//     router.push(`/(tabs)/playlist/${playlist.name}`);
//   };

//   return (
//     <View style={defaultStyles.container}>
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={{
//           paddingHorizontal: screenPadding.horizontal,
//         }}
//       >
//         <PlaylistsList
//           scrollEnabled={false}
//           playlists={filteredPlaylists}
//           onPlaylistPress={handlePlaylistPress}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default PlaylistsScreen;
