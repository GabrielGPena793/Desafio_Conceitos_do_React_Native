import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import xIcon from "../assets/icons/trash/x.png";
import editIcon from "../assets/icons/trash/edit.png";
import { Task } from "./TasksList"

interface TaskItemProps {
  task: Task,
  index: number,
  toggleTaskDone: (id: number) => void,
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void

}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

  const [isEditing, setIsEdit] = useState(false);
  const [taskTitleEdited, setTaskTitleEdited] = useState(task.title);
  const textInputRef = useRef<TextInput | null>(null)

  function handleStartEditing(){
    setIsEdit(true)
  }

  function handleCancelEditing(){
    setTaskTitleEdited(task.title);
    setIsEdit(false)
  }

  function handleSubmitEditing(){
    editTask(task.id, taskTitleEdited)
    setIsEdit(false)
  }

  useEffect(() => {
    if(isEditing){
      textInputRef.current?.focus()
    }else{
      textInputRef.current?.blur()
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            onChangeText={setTaskTitleEdited}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          >
            {taskTitleEdited}
          </TextInput>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
            style={{ paddingHorizontal: 20}}
            onPress={isEditing ? handleCancelEditing : handleStartEditing}
            >
            <Image source={isEditing ? xIcon : editIcon} /> 
        </TouchableOpacity>
          
          <View style={styles.BoxDivision}/>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, opacity: isEditing ? 0.2 : 1  }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
          >
          <Image source={trashIcon} /> 
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  BoxDivision:{
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    width: 1,
    height: 24,
  }
})