import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({ label, style, textColor }) {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={() => alert("You pressed a button.")}
    >
      <Text style={{ textColor }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
});
