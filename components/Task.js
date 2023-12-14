import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Button from "./Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DialogInput from "react-native-dialog-input";

const Task = ({
  title,
  date,
  onAddDate,
  onAddLoc,
  onToggle,
  onRemove,
  isOpen,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  function toggle() {
    onToggle();
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setSelectedDate(selectedDate);
    onAddDate(selectedDate);
    hideDatePicker();
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return new Date(date).toLocaleDateString("en-US");
    }
    return "";
  };

  return (
    <View style={styles.task}>
      <View>
        <Text style={styles.taskTitle}>{title}</Text>
        {isOpen && date && (
          <Text style={styles.taskDate}>
            {formatDate(selectedDate)}
          </Text>
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
          <View>
            <TouchableOpacity
              style={styles.addDateButton}
              onPress={showDatePicker}
            >
              <Text style={styles.addDateButtonText}>Add Date</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addDateButton}
              onPress={() => {
                setShowPrompt(true);
              }}
            >
              <Text style={styles.addDateButtonText}>
                Add Location
              </Text>
            </TouchableOpacity>

            <Button
              icon="delete"
              iconColor="white"
              backgroundColor="red"
              onPress={onRemove}
            />
          </View>
        )}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate ? new Date(selectedDate) : new Date()} // to save date in modal
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DialogInput
        isDialogVisible={showPrompt}
        title="Enter Location"
        message="Relate your task to a location"
        submitInput={(inputText) => {
          setShowPrompt(false);
          onAddLoc(inputText);
        }}
        closeDialog={() => {
          setShowPrompt(false);
        }}
      ></DialogInput>
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
