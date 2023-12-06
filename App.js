import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  AppState,
  useWindowDimensions,
} from "react-native";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import Button from "./components/Button";
import Task from "./components/Task";
import { save, load } from "./components/Save";
import getDate from "./components/Date";

export default function App() {
  const [showTask, setShowTask] = useState(true);
  const [showComingUp, setShowComingUp] = useState(false);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  // State for tracking currently opened task's key
  const [openTaskKey, setOpenTaskKey] = useState(null);
  const toggleOpenTask = (itemKey) => {
    setOpenTaskKey(openTaskKey === itemKey ? null : itemKey);
  };

  const [markers, setMarks] = useState();
  const [markerList, setMarkerList] = useState([
    {
      key: "Chicago",
      selected: false,
      longitude: -87.6297982,
      latitude: 41.8781136,
    },
    {
      key: "Boise State University",
      selected: false,
      longitude: -116.20871,
      latitude: 43.6036,
    },
  ]);

  const delta = 0.2;

  const [location, setLocation] = useState([
    {
      key: "Chicago",
      selected: false,
      longitude: -87.6297982,
      latitude: 41.8781136,
    },
  ]);

  useEffect(() => {
    // Only load data on first render.
    async function loadData() {
      let data = await load();
      setList(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    // Whenever list changes, save new data.
    save(list);
  }, [list]);

  function addTask() {
    if (title === "") {
      return;
    }
    const newList = list.concat({
      key: list.length + 1,
      title: title,
      description: "",
      // date: getDate(),
      date: new Date(),
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

  // Handles updating the date in a task
  const handleDateChange = (itemKey, selectedDate) => {
    const updatedList = list.map((item) =>
        item.key === itemKey ? { ...item, date: selectedDate } : item
    );
    setList(updatedList);
  };


  // Add a date for a specific task
  const handleAddDate = (itemKey, selectedDate) => {
    const updatedList = list.map((item) =>
        item.key === itemKey ? { ...item, date: selectedDate } : item
    );
    setList(updatedList);
  };

  const renderTask = ({ item }) => (
      <Task title={item.title}
            date={item.date}
            onAddDate={(selectedDate) => handleAddDate(item.key, selectedDate)}
            onPress={() => handleDateChange(item.key, item.date)}
            onToggle={() => toggleOpenTask(item.key)}
            isOpen={openTaskKey === item.key}
      />
  );

  function change() {
    setShowTask(showTask ? false : true);
  }

  function changeView(view) {
    setShowTask(view === "task");
    setShowComingUp(view === "comingUp");
  }

  const taskView = (
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
            />
            <Button
                style={{ width: 30 }}
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
          <View style={styles.bottom}>
            <Button label="Menu" icon="menu" iconColor={"white"} />
            <Button
                label="Location"
                icon="location-on"
                iconColor={"white"}
                onPress={() => change()}
            />
            <Button
                label="Coming Up"
                icon="date-range"
                iconColor={"white"}
                onPress={() => changeView("comingUp")}
            />
          </View>
        </View>
      </View>
  );

  const mapView = (
      <View style={styles.containerL}>
        <MapView
            style={styles.portrait}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: delta,
              longitudeDelta: delta,
            }}
        >
          {markers}
        </MapView>
        <View style={styles.wrapper}>
          <View style={styles.bottom}>
            <Button
                label="Home"
                icon="home"
                iconColor={"white"}
                onPress={() => change()}
            />
          </View>
        </View>
      </View>
  );

  const comingUpView = (
      <View style={styles.containerComingUp}>
        <Text>Coming Up View</Text>
        <View style={styles.wrapper}>
          <View style={styles.bottom}>
            <Button
                label="Back to Task"
                icon="arrow-back"
                iconColor="white"
                onPress={() => changeView("task")}
            />
          </View>
        </View>
      </View>
  );

  // return showTask ? taskView : mapView;
  let currentView;
  if (showTask) {
    currentView = taskView;
  } else if (showComingUp) {
    currentView = comingUpView;
  } else {
    currentView = mapView;
  }

  return (
      <View style={styles.container}>
        {currentView}
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
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  top: {
    backgroundColor: "gray",
    borderRadius: 10,
    width: "100%",
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottom: {
    padding: 5,
    height: 50,
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  tasks: {
    marginBottom: 30,
    marginTop: 30,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    width: "75%",
    height: 40,
    margin: 5,
    borderRadius: 5,
    padding: 10,
  },
  portrait: {
    width: "100%",
    height: "80%",
  },
  containerComingUp: {
    flex: 1,
    backgroundColor: "#AABBCC",
    justifyContent: "center",
    alignItems: "center",
  },
});