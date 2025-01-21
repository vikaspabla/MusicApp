import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Animated } from "react-native";
import { colors, fontSize } from "../constants/tokens"; // Import colors and font size constants

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  style?: object; // Allow custom styling
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, style }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [buttonOpacity] = useState(new Animated.Value(0)); // Initial opacity set to 0 (invisible)

  const handleChangeText = (text: string) => {
    setSearchTerm(text);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // Animate button visibility
  const toggleButtonVisibility = () => {
    Animated.timing(buttonOpacity, {
      toValue: searchTerm || isFocused ? 1 : 0, // Fade in if there's text or focus, fade out otherwise
      duration: 300, // Duration of the animation in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // Trigger animation when search term changes or input is focused/blurred
  React.useEffect(() => {
    toggleButtonVisibility();
  }, [searchTerm, isFocused]);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, { width: "80%" }]} // Make input take most of the width
        value={searchTerm}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)} // Mark as focused when user clicks
        onBlur={() => setIsFocused(false)} // Mark as unfocused when user clicks out
        placeholder="Search Songs"
        placeholderTextColor={colors.textMuted} // Grey placeholder text
        selectionColor={colors.primary} // Set the cursor color to primary red
      />
      {/* Conditionally render the search button with animated opacity */}
      {(searchTerm || isFocused) && (
        <Animated.View
          style={[styles.buttonContainer, { opacity: buttonOpacity }]}
        >
          <Button
            title="Search"
            onPress={handleSearch}
            color={colors.primary}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // To align the button and input horizontally
    padding: 10,
    backgroundColor: "transparent", // Transparent to match the navigation bar background
    borderRadius: 8,
    marginBottom: 15,
    width: "100%", // Ensure container takes full width
    alignItems: "center", // Align the button and input vertically
  },
  input: {
    height: 50, // Increase height for a bigger search bar
    fontSize: fontSize.base,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#1c1c1f", // Dark gray background for the input field
    marginRight: 10, // Space between the input and button
    color: colors.text, // Text color inside the input
    flex: 1, // Take up most of the container's width
  },
  buttonContainer: {
    marginLeft: 10, // Space between the button and the input field
  },
});

export default SearchBar;
