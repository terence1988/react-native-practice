import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface IButton {
  onPress: () => void;
  title: string;
  style?: any;
  disabled?: boolean;
}

export default function Button({
  onPress,
  title = "Button",
  style = {},
  disabled,
}: IButton) {
  const defaultStyles = {
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "black",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  };
  // by default the sub values are replaced in JS
  // but we can use another merge to merge the objects

  const _styles = StyleSheet.create({
    button: { ...defaultStyles.button, ...style.button },
    text: { ...defaultStyles.text, ...style.text },
  });

  return (
    <Pressable style={_styles.button} disabled={disabled} onPress={onPress}>
      <Text style={_styles.text}>{title}</Text>
    </Pressable>
  );
}
