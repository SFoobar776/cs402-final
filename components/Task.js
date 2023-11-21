import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

import Button from "./Button";

const Task = ({ title, date, onPress }) => {
  function toggle() {
    alert("You pressed a task.");
  }

  return (
    <View style={styles.task} onPress={toggle}>
      <View>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDate}>{date}</Text>
      </View>
      <View style={styles.taskButton}>
        <Button
          icon="expand-more"
          size={"sm"}
          iconColor="white"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: "#696969",
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskTitle: {
    color: "#ECECEC",
    fontSize: 24,
    fontWeight: "bold",
  },
  taskDate: {
    color: "#ECECEC",
    textShadowColor: "black",
    textShadowRadius: 3,
  },
});

export default Task;
