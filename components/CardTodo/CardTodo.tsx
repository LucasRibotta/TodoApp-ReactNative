import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TodoInfo, UpdateScreenNavigationProp } from "../../models";
import { CheckBoxComponent } from "./components";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteTodoReducer, setTodosReducer } from "../../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function CardTodo({ id, title, description, isCompleted }: TodoInfo) {
  const todos = useAppSelector((state) => state.todos.todos);
  const navigation = useNavigation<UpdateScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(todos.filter((todo) => todo.id != id))
      );
      console.log("Todo deleted correctly");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBoxComponent
          id={id}
          title={title}
          description={description}
          isCompleted={isCompleted}
        />
        <View>
          <Text
            style={
              isCompleted
                ? [
                    style.text,
                    { textDecorationLine: "line-through", color: "#73737370" },
                  ]
                : style.text
            }
          >
            {title}
          </Text>
          <Text
            style={
              isCompleted
                ? [
                    style.description,
                    { textDecorationLine: "line-through", color: "#73737370" },
                  ]
                : style.description
            }
          >
            {description}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Update", { id: id })}
        >
          <MaterialIcons style={{ color: "#FFCC80" }} name="edit" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteTodo}>
          <MaterialIcons
            style={{ color: "red" }}
            name="delete-outline"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CardTodo;

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    color: "#737373",
  },
  description: {
    fontSize: 13,
    color: "#a3a3a3",
    fontWeight: "600",
  },
});
