import { Redirect, useLocalSearchParams } from "expo-router";
import { useArtists } from "../../../store/library";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenPadding } from "../../../constants/tokens";
import { ArtistTracksList } from "../../../components/ArtistTracksList";

const ArtistDetailsScreen = () => {
  const { name: artistName } = useLocalSearchParams<{ name: string }>();

  const artists = useArtists();

  const artist = artists.find((artist) => artist.name === artistName);

  if (!artist) {
    console.warn(`Artist $(artistName) not found`);

    return <Redirect href={"/(tabs)/artist"} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <ArtistTracksList artist={artist} />
      </ScrollView>
    </View>
  );
};

export default ArtistDetailsScreen;
