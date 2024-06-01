import React, { useState, useEffect } from "react";
import { Text, View, Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { updateTodoListReducer } from "../../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonIcon, InputComponent, ButtonComponent } from "../components";
import { styles, text } from "../../styles";

interface RouteParams {
  id: number;
}

function UpdateFormComponent() {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const todo = useAppSelector((state) =>
    state.todos.todos.find((todo) => todo.id === id)
  );
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const [descriptionError, setDescriptionError] = useState("");
  const listTodos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const updateTodo = async () => {
    if (description.length > 300) {
      setDescriptionError("Description cannot exceed 300 characters.");
      return;
    }
    const updatedTodo = {
      id,
      title,
      description,
    };
    try {
      const updatedListTodos = listTodos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      );
      await AsyncStorage.setItem("@Todos", JSON.stringify(updatedListTodos));
      dispatch(updateTodoListReducer(updatedTodo));
      console.log("Todo updated successfully");
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
        <Text style={text.xl}>Update task</Text>
      </View>

      <InputComponent
        title="Title"
        placeholder="Add Title..."
        numberLine={2}
        maxCharacter={100}
        placeholderColor="#00000030"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      <InputComponent
        title="Description"
        placeholder="Add Description..."
        numberLine={4}
        maxCharacter={300}
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

      <ButtonComponent onFunction={updateTodo}>
        <Text style={{ color: "white" }}>Actualizar</Text>
      </ButtonComponent>
    </View>
  );
}

export default UpdateFormComponent;
