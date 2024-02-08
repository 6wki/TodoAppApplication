import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import { persistReducer } from "redux-persist";
import storage from "./storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Configuration for persisting tasks
const tasksPersistConfig = {
  key: "tasks",
  storage,
};

// Combine reducers and apply persistence configuration
const rootReducer = persistReducer(tasksPersistConfig, taskReducer);

// Create the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for useDispatch and useSelector with typed support
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
