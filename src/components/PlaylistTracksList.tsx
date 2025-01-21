// import { useMemo } from "react";
// import { Playlist } from "../helpers/types";
// import { useNavigationSearch } from "../hooks/useNavigationSearch";
// import { trackTitleFilter } from "../helpers/filter";
// import TrackList from "./TrackList";
// import { generateTracksListId } from "../helpers/miscellaneous";
// import { View, StyleSheet, Text } from "react-native";
// import FastImage from "react-native-fast-image";
// import { defaultStyles } from "../styles";
// import { fontSize } from "../constants/tokens";
// import { QueueControls } from "./QueueControls";
// import { unknownTrackImageUri } from "../constants/image";

// export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
//   const search = useNavigationSearch({
//     searchBarOptions: {
//       placeholder: "Search Playlist Songs",
//       hideWhenScrolling: true,
//     },
//   });

//   const filteredPlaylistTracks = useMemo(() => {
//     return playlist.tracks.filter(trackTitleFilter(search));
//   }, [playlist, search]);

//   return (
//     <TrackList
//       id={generateTracksListId(playlist.name, search)}
//       scrollEnabled={false}
//       tracks={filteredPlaylistTracks}
//       hideQueueControls={true}
//       ListHeaderComponentStyle={styles.playlistHeaderContainer}
//       ListHeaderComponent={
//         <View>
//           <View style={styles.artworkImageContainer}>
//             <FastImage
//               source={{
//                 uri: unknownTrackImageUri,
//                 priority: FastImage.priority.high,
//               }}
//               style={styles.playlistImage}
//             />
//           </View>
//           <Text numberOfLines={1} style={styles.playlistNameText}>
//             {playlist.name}
//           </Text>

//           {search.length === 0 && (
//             <QueueControls
//               tracks={filteredPlaylistTracks}
//               style={{ paddingTop: 24, paddingBottom: 20 }}
//             />
//           )}
//         </View>
//       }
//     />
//   );
// };

// const styles = StyleSheet.create({
//   playlistHeaderContainer: {
//     flex: 1,
//     marginBottom: 32,
//   },
//   artworkImageContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     height: 200,
//   },
//   playlistImage: {
//     width: "60%",
//     height: "100%",
//     resizeMode: "cover",
//     borderRadius: 128,
//   },
//   playlistNameText: {
//     ...defaultStyles.text,
//     marginTop: 22,
//     textAlign: "center",
//     fontSize: fontSize.lg,
//     fontWeight: "800",
//   },
// });
