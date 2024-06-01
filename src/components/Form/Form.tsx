import React, { useState } from "react";
import { Text, View, Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addTodosReducer } from "../../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonComponent, ButtonIcon } from "../components/Button";
import { InputComponent } from "../components";
import { styles, text } from "../../styles";

function FormComponent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const listTodos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const addTodo = async () => {
    if (description.length > 300) {
      setDescriptionError("Description cannot exceed 300 characters.");
      return;
    }
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      title: name,
      description: description,
      isCompleted: false,
    };
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify([...listTodos, newTodo])
      );
      dispatch(addTodosReducer(newTodo));
      console.log("All added correctly");
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={[
        styles.containerForm,
        Platform.OS === "web" && styles.containerWeb,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ButtonIcon onFunction={() => navigation.goBack()}>
          <MaterialIcons name="arrow-circle-left" size={32} />
        </ButtonIcon>
        <Text style={text.xl}>Add new task</Text>
      </View>
      <InputComponent
        title="Title"
        placeholder="Add Title..."
        placeholderColor="#00000030"
        onChangeText={(text) => {
          setName(text);
        }}
        value={name}
      />
      <InputComponent
        title="Description"
        placeholder="Add Description..."
        placeholderColor="#00000030"
        onChangeText={(text) => {
          if (text.length <= 300) {
            setDescription(text);
            setDescriptionError("");
          } else {
            setDescriptionError("Description cannot exceed 300 characters.");
          }
        }}
        value={description}
        {...(descriptionError ? (
          <Text style={text.error}>{descriptionError}</Text>
        ) : null)}
      />
      <ButtonComponent onFunction={addTodo}>
        <Text style={{ color: "white" }}>Crear</Text>
      </ButtonComponent>
    </View>
  );
}

export default FormComponent;
