import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";
import Button from "./Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Task = ({ title, date, onPress, onAddDate, onToggle, isOpen }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);

  function toggle() {
    // alert("You pressed a task.");
    onToggle();
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    setSelectedDate(selectedDate);
    onAddDate(selectedDate);
  };


  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return ""; // Return an empty string or any default value for invalid dates
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US");
    return formattedDate;
  };

  return (
      <View style={styles.task}>
        <View>
          <Text style={styles.taskTitle}>{title}</Text>
          {isOpen && date && (
              <Text style={styles.taskDate}>{formatDate(selectedDate)}</Text>
          )}
        </View>
        <View style={styles.taskButton}>
          <Button
              icon="expand-more"
              size={"sm"}
              iconColor="white"
              onPress={toggle}
          />
          {isOpen && (
              <TouchableOpacity
                  style={styles.addDateButton}
                  onPress={showDatePicker}
              >
                <Text style={styles.addDateButtonText}>Add Date</Text>
              </TouchableOpacity>
          )}
        </View>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={selectedDate ? new Date(selectedDate) : new Date()} // to save date in modal
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
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
  addDateButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  addDateButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Task;
