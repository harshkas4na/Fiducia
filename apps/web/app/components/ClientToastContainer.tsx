"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientToastContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName={() =>
        "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-transparent border border-red-500 bg-opacity-10 backdrop-filter backdrop-blur-sm"
      }
      bodyClassName={() => "text-sm font-white font-med block p-3"}
      progressClassName={() =>
        "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-purple-600"
      }
    />
  );
}
