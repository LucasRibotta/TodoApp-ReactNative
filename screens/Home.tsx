import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { TodoList } from "../components";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UpdateScreenNavigationProp } from "../models";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { completeReducer, setTodosReducer } from "../redux/todosSlice";
import SearchBar from "../components/Search/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreen() {
  const todos = useAppSelector((state) => state.todos.todos);

  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UpdateScreenNavigationProp>();

  const getTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem("@Todos");
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleCompleted = async () => {
    if (isCompleted) {
      setIsCompleted(false);
      const todos = await AsyncStorage.getItem("@Todos");
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }
      return;
    }
    setIsCompleted(true);
    dispatch(completeReducer());
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/564x/0d/98/b2/0d98b2916254548f2c79a57eb8768969.jpg",
        }}
        style={styles.pic}
      />
      <SearchBar />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Lista de tareas</Text>
      </View>

      {/* 
      Funcionalidad de filtrado comentada, es un button text que permite filtrar por tareas completadas.
      Por estetica decidi implementar un filtrado diferente entre tareas completadas y pendientes.
      <View style={styles.containerFilter}>
        <TouchableOpacity style={styles.filterButton} onPress={handleCompleted}>
          <Text style={styles.filter}>
            {isCompleted ? "Completadas" : "Pendientes"}
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ flexDirection: "column", gap: 8 }}>
        <Text style={styles.titleList}>Pendientes</Text>
        <TodoList todosData={todos.filter((todo) => !todo.isCompleted)} />
      </View>
      <View style={{ flexDirection: "column", gap: 8 }}>
        <Text style={styles.titleList}>Completadas</Text>
        <TodoList todosData={todos.filter((todo) => todo.isCompleted)} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.button}
      >
        <MaterialIcons name="add" size={36} color="#FFF" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    backgroundColor: "#F1ECEA30",
  },
  pic: {
    width: 80,
    height: 80,
    borderRadius: 32,
    alignSelf: "flex-end",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#000",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleList: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerFilter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  filterButton: {
    backgroundColor: "#B5B5B530",
    borderRadius: 20,
    padding: 10,
  },
  filter: {
    fontSize: 18,
    fontWeight: "700",
    color: "#202020",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "#FFCC80",
    position: "absolute",
    bottom: 50,
    right: 15,
    shadowColor: "#FFCC80",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 36,
    height: 36,
    textAlign: "center",
    textAlignVertical: "center",
  },
});