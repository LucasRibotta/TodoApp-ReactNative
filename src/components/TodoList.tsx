import { View } from "react-native";
import { CardTodo } from "./CardTodo";
import { TodoInfo } from "../models";

interface Props {
  todosData: TodoInfo[];
}

function TodoList({ todosData }: Props) {
  return (
    <View>
      {todosData.map((item) => (
        <CardTodo key={item.id} {...item} />
      ))}
    </View>
  );
}

export default TodoList;
