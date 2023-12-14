import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ComingUp = ({ tasks }) => {
  const currDay = new Date().toLocaleDateString("en-US");

  // Filter tasks that match today's date
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date).toLocaleDateString("en-US");
    return taskDate === currDay;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
      <View style={styles.taskList}>
        {todayTasks.map((task) => (
          <View key={task.key} style={styles.task}>
            <Text style={styles.taskText}>{task.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskList: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  task: {
    backgroundColor: "#6B6B6B",
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "white",
  },
});

export default ComingUp;
