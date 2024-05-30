import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../redux/hooks";
import { searchTodoList, setTodosReducer } from "../../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      await AsyncStorage.setItem("@SearchTerm", searchTerm);

      dispatch(searchTodoList(searchTerm));
    } catch (error) {
      console.error("Error al guardar el término de búsqueda:", error);
    }
  };

  const handleRefresh = async () => {
    try {
      setSearchTerm("");
      const allTodos = await AsyncStorage.getItem("@Todos");
      if (allTodos !== null) {
        const parsedTodos = JSON.parse(allTodos);

        dispatch(setTodosReducer(parsedTodos));
      }
    } catch (error) {
      console.error("Error al restaurar los todos desde AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="refresh"
        size={24}
        color="#666"
        onPress={handleRefresh}
      />
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.input}
          placeholder="Buscar tarea por nombre..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <MaterialIcons
          name="search"
          size={24}
          color="#666"
          onPress={handleSearch}
        />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: "90%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
});

export default SearchBar;
