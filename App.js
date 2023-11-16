import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import Button from "./Button";

// dummy object
const object = {
  key: 1,
  title: "Dentist Appt",
  description: "Will be painful",
  date: "2024-01-01",
  done: false,
  selected: false,
  location: {
    lat: 0,
    lng: 0,
  },
};

const Task = ({ title, description, onPress }) => (
  <Pressable style={styles.taskContainer} onPress={onPress}>
    <View>
      <Text style={[styles.taskTitle, styles.taskText]}>{title}</Text>
      <Text style={styles.taskText}>{description}</Text>
    </View>
    <View style={styles.buttonGroup}>
      <Button label="Done" />
      <Button
        textColor={"white"}
        style={styles.deleteButton}
        label="Delete"
      />
    </View>
  </Pressable>
);

export default function App() {
  const [list, setList] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>MY TODOS</Text>
      <Task title={object.title} description={object.description} />
    </View>
  );
}

const styles = StyleSheet.create({
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 5,
    padding: 15,
    backgroundColor: "#696969",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  taskText: {
    color: "#daa520",
    textShadowColor: "black",
    textShadowRadius: 5,
  },
  deleteButton: {
    color: "white",
    backgroundColor: "#b22222",
  },
});
