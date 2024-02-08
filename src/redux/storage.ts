"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Function to create a no-operation storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Determine whether to use browser storage or no-operation storage based on environment
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
