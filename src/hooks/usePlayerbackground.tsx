import { colors } from "../constants/tokens";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { getColors } from "react-native-image-colors";
import { IOSImageColors } from "react-native-image-colors/build/types";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<IOSImageColors | null>(null);

  useEffect(() => {
    // If the platform is Android, do nothing
    if (Platform.OS === "android") {
      return; // Skip further processing
    }

    // For iOS, attempt to get colors from the image
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors as IOSImageColors));
  }, [imageUrl]);

  return { imageColors };
};
