import { createSlice } from "@reduxjs/toolkit";
import { TodoInfo } from "../models";

interface TodoModel {
  todos: TodoInfo[];
}

const initialState: TodoModel = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodosReducer: (state, action) => {
      state.todos = action.payload;
    },
    addTodosReducer: (state, action) => {
      state.todos.push(action.payload);
    },
    completeReducer: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    },
    updateTodoReducer: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
    },
    updateTodoListReducer: (state, action) => {
      const { id, title, description } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title !== undefined ? title : todo.title,
            description:
              description !== undefined ? description : todo.description,
          };
        }
        return todo;
      });
    },
    deleteTodoReducer: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    searchTodoList: (state, action) => {
      if (!action.payload.trim()) {
        state.todos = state.todos;
      } else {
        state.todos = state.todos.filter((todo) =>
          todo.title.toLowerCase().includes(action.payload.trim().toLowerCase())
        );
      }
    },
  },
});

export const {
  setTodosReducer,
  addTodosReducer,
  completeReducer,
  updateTodoReducer,
  updateTodoListReducer,
  deleteTodoReducer,
  searchTodoList,
} = todosSlice.actions;

export default todosSlice.reducer;
