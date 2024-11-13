import React, { createContext, useContext, useState } from "react";

// Create Toast Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [autoCloseDuration, setAutoCloseDuration] = useState(5);
  const [position, setPosition] = useState("top-right");

  const showToast = (title, message, type) => {
    const toast = {
      id: Date.now(),
      title,
      message,
      type,
    };

    setToasts((prevToasts) => {
      // Check if a toast with the same title and message already exists
      const exists = prevToasts.some(
        (t) => t.title === toast.title && t.message === toast.message
      );

      // If it doesn't exist, add the new toast
      if (!exists) {
        return [...prevToasts, toast];
      }

      // If it exists, return the previous state unchanged
      return prevToasts;
    });

    setTimeout(() => {
      removeToast(toast.id);
    }, autoCloseDuration * 1000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  const value = {
    toasts,
    showToast,
    removeToast,
    removeAllToasts,
    autoCloseDuration,
    setAutoCloseDuration,
    position,
    setPosition,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

// Custom hook to use the Toast Context
export const useToast = () => {
  return useContext(ToastContext);
};
