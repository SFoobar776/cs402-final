import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Button = ({
  onPress,
  label,
  size,
  backgroundColor,
  icon,
  iconColor,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        size === "sm" && {
          paddingHorizontal: 8,
          paddingVertical: 2,
          elevation: 6,
        },
        backgroundColor && { backgroundColor },
      ]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={18} color={iconColor} />
      <Text style={[styles.text, size === "sm" && { fontSize: 10 }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
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
});

export default Button;
