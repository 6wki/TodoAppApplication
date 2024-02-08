// Import necessary dependencies and components
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/utils/reduxProvider";
import { ToastContainer } from "react-toastify";

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App for an application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      {/* Use ReduxProvider to wrap the children */}
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer />
          {/* Render the ToastContainer for displaying notifications */}
        </body>
      </html>
    </ReduxProvider>
  );
}
