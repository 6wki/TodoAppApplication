"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

// Persist the Redux store
persistStore(store);

// ReduxProvider component for providing Redux store to the application
export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
