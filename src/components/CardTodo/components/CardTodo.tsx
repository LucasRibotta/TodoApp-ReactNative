import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { deleteTodoReducer } from "../../../redux/todosSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CheckBoxComponent from "./CheckBox";
import { TodoInfo, UpdateScreenNavigationProp } from "../../../models";

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
      <View style={style.content}>
        <CheckBoxComponent
          id={id}
          title={title}
          description={description}
          isCompleted={isCompleted}
          color={""}
        />
        <View style={style.textContainer}>
          <Text
            style={
              isCompleted
                ? [
                    style.text,
                    {
                      textDecorationLine: "line-through",
                      color: "#73737370",
                    },
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
                    {
                      textDecorationLine: "line-through",
                      color: "#73737370",
                    },
                  ]
                : style.description
            }
          >
            {description}
          </Text>
        </View>
      </View>
      <View style={style.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Update", { id: id })}
        >
          <MaterialIcons style={style.editIcon} name="edit" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteTodo}>
          <MaterialIcons
            style={style.deleteIcon}
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
    padding: 8,
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
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    maxWidth: "80%",
    marginLeft: 8,
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
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 4,
  },
  editIcon: {
    color: "#FFCC80",
  },
  deleteIcon: {
    color: "red",
  },
});
