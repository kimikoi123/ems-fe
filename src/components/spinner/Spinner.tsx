import React from "react";

interface SpinnerProps {
  message?: string;
  isVisible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ message = "", isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        <p className="text-white text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
