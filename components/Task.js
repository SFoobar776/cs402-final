import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";
import Button from "./Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DialogInput from 'react-native-dialog-input';

const Task = ({ title, date, onPress, onAddDate, onAddLoc, onToggle, isOpen }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
    // setSelectedDate(selectedDate || null);
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

          {isOpen && (
              <TouchableOpacity
                  style={styles.addDateButton}
                  onPress={() => {setShowPrompt(true)}}
              >
                <Text style={styles.addDateButtonText}>Add Location</Text>
              </TouchableOpacity>
              
          )}
          
        </View>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            // value={selectedDate || new Date()}
            date={selectedDate ? new Date(selectedDate) : new Date()} // to save date in modal
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        ></DateTimePickerModal>

        <DialogInput 
          isDialogVisible={showPrompt}  
          title="Enter Address"
          message="Enter The Address To Add"
          submitInput={ (inputText) =>{
            setShowPrompt(false); 
            onAddLoc(inputText);}}
          closeDialog={() => {setShowPrompt(false)}}
          >
        </DialogInput>
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