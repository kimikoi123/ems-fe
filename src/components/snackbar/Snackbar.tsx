"use client";

import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  isError?: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isOpen,
  onClose,
  duration = 3000,
  isError = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const backgroundColor = isError ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${backgroundColor} text-white px-4 py-2 rounded shadow-lg transition-all`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
