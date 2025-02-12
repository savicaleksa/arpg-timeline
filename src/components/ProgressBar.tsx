import React from "react";

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      className="h-3 bg-gray-500 rounded-bl-full rounded-tr-full overflow-hidden relative"
      style={{ width: "100%" }}
    >
      <div
        className="h-full bg-gray-200 rounded-bl-full rounded-tr-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
