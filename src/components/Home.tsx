import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UpdateScreenNavigationProp } from "../models";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { completeReducer, setTodosReducer } from "../redux/todosSlice";
import SearchBar from "../components/Search/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { TodoList } from "./CardTodo";

function HomeComponent() {
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
      <ScrollView>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/0d/98/b2/0d98b2916254548f2c79a57eb8768969.jpg",
          }}
          style={styles.pic}
        />
        <SearchBar />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Todo App</Text>
        </View>
        <View style={{ gap: 12, height: "100%" }}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={styles.titleList}>Pending tasks</Text>
            {todos.length > 0 ? (
              <TodoList todosData={todos.filter((todo) => !todo.isCompleted)} />
            ) : (
              <Text style={styles.noTask}>There are no pending tasks...</Text>
            )}
          </View>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={styles.titleList}>Completed tasks</Text>
            {todos.length > 0 ? (
              <TodoList todosData={todos.filter((todo) => todo.isCompleted)} />
            ) : (
              <Text style={styles.noTask}>There are no completed tasks...</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add")}
          style={styles.button}
        >
          <MaterialIcons
            name="add"
            size={36}
            color="#FFF"
            style={styles.icon}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    backgroundColor: "#F1ECEA30",
    height: "auto",
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
  noTask: {
    fontSize: 18,
    paddingVertical: 20,
    fontWeight: "500",
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
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#FFCC80",
    position: "absolute",
    top: 30,
    left: 15,
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
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
