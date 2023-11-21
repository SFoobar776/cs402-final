import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";

import Button from "./components/Button";
import Task from "./components/Task";

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}-${day}-${year}`;
}

// dummy object
const dummyObject = {
  key: 1,
  title: "Dentist Appt",
  description: "Will be painful",
  date: getDate(),
  done: false,
  selected: false,
  location: {
    lat: 0,
    lng: 0,
  },
};

export default function App() {
  const [list, setList] = useState([dummyObject]);
  const [title, setTitle] = useState("");

  function addTask() {
    if (title === "") {
      return;
    }
    const newList = list.concat({
      key: list.length + 1,
      title: title,
      description: "",
      date: getDate(),
      done: false,
      selected: false,
      location: {
        lat: 0,
        lng: 0,
      },
    });

    setTitle("");
    setList(newList);
  }

  const renderTask = ({ item }) => (
    <Task title={item.title} date={item.date} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.appTitle}>My todos</Text>
        <View style={styles.top}>
          <TextInput
            label="Title"
            maxLength={30}
            style={styles.input}
            inlineImageLeft="search_icon"
            placeholderTextColor={"gray"}
            placeholder="Enter task title..."
            onChangeText={(text) => setTitle(text)}
            value={title}
          ></TextInput>
          <Button
            label="Add"
            onPress={() => addTask()}
            icon="library-add"
            iconColor={"white"}
            backgroundColor={"green"}
          />
        </View>
        <View style={styles.tasks}>
          <FlatList data={list} renderItem={renderTask} />
        </View>
        {list.length > 0 && (
          <View style={styles.bottom}>
            <Button label="Menu" icon="menu" iconColor={"white"} />
            <Button
              label="Location"
              icon="location-on"
              iconColor={"white"}
            />
            <Button
              label="Coming Up"
              icon="date-range"
              iconColor={"white"}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8E8E8E", // #E8EAED
  },
  wrapper: {
    margin: 10,
    padding: 10,
  },
  top: {
    backgroundColor: "gray",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottom: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 30,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    margin: "auto",
  },
  tasks: {
    marginBottom: 30,
    marginTop: 30,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    height: 40,
    margin: 5,
    borderRadius: 5,
    padding: 10,
  },
});
