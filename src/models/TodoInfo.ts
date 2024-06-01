export default interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  image?: string;
  color: string;
}

export type TodoInfo = Todo[];
