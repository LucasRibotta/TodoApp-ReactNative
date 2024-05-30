import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TodoInfo } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateTodoReducer } from "../../../redux/todosSlice";

function CheckBoxComponent({ id, title, description, isCompleted }: TodoInfo) {
  const dispatch = useAppDispatch();
  const listTodos = useAppSelector((state) => state.todos.todos);

  const handleCheckBox = () => {
    try {
      dispatch(updateTodoReducer({ id, isCompleted }));
      AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(
          listTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, isCompleted: !todo.isCompleted };
            } else {
              return todo;
            }
          })
        )
      );
      console.log("Todo saved correctly");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={handleCheckBox}
      style={isCompleted ? style.checked : style.unChecked}
    >
      {isCompleted && <Entypo name="check" size={16} color="#FAFAFA" />}
    </TouchableOpacity>
  );
}

export default CheckBoxComponent;

const style = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E8E8E8",
    backgroundColor: "#fff",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});
