import { FlatList } from "react-native";
import { CardTodo } from "./CardTodo";
import { TodoInfo } from "../models";

interface Props {
  todosData: TodoInfo[];
}

function TodoList({ todosData }: Props) {
  return (
    <FlatList
      data={todosData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CardTodo {...item} />}
    />
  );
}

export default TodoList;
