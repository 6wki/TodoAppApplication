import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";

// Define the shape of the tasks slice state
interface TasksState {
  tasks: Task[];
}

// Define the initial state of the tasks slice
const initialState: TasksState = {
  tasks: [],
};

// Create a slice for managing tasks using createSlice from Redux Toolkit
const taskSlice = createSlice({
  name: "tasks", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer for adding a new task
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Reducer for deleting a task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Reducer for toggling the completion status of a task
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    },
    // Reducer for updating the details of a task
    updateTask(state, action: PayloadAction<Task>) {
      const { id, title, description } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
      }
    },
  },
});

// Export the action creators and the reducer function
export const { addTask, deleteTask, toggleTaskCompletion, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
