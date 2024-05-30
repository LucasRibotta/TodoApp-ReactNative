import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { updateTodoListReducer } from "../../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

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
    if (description.length > 100) {
      setDescriptionError(
        "La descripcion no puede exceder los 300 caracteres."
      );
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
      console.log("Todo actualizado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={[styles.container, Platform.OS === "web" && styles.containerWeb]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Actualizar tarea</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Titulo:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Añadir titulo..."
          placeholderTextColor="#00000030"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Descripción:</Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={100}
          placeholder="Añadir descripción..."
          placeholderTextColor="#00000030"
          onChangeText={(text) => {
            if (text.length <= 100) {
              setDescription(text);
              setDescriptionError("");
            } else {
              setDescriptionError(
                "La descripción no puede exceder los 300 caracteres."
              );
            }
          }}
          value={description}
          style={[styles.textInput, { padding: 10 }]}
        />
        {descriptionError ? (
          <Text style={styles.errorText}>{descriptionError}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={[styles.button, Platform.OS === "web" && styles.webButton]}
        onPress={updateTodo}
      >
        <Text style={{ color: "white" }}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UpdateFormComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    paddingTop: 50,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 0.5,
    width: "100%",
    height: 50,
  },
  container: {
    maxWidth: 500,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#F1ECEA30",
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: "auto",
  },
  containerWeb: {
    maxWidth: 700,
    paddingHorizontal: 50,
    paddingVertical: 50,
    justifyContent: "center",
  },
  webButton: {
    width: "100%",
  },
  inputTitle: {
    fontSize: 25,
    fontWeight: "600",
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 20,
    gap: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
