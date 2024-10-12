import React from "react";

export const Progress = ({ value, className }) => {
  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      role="progressbar"
      className={`bg-primary/20 relative h-2 w-full overflow-hidden rounded-full ${className}`}
    >
      <div
        className={`h-full w-full flex-1 transition-all`}
        style={{
          transform: `translateX(${value - 100}%)`,
          backgroundColor: `hsl(var(--${value < 34 ? "danger" : value < 68 ? "warning" : "success"}-bar))`,
        }}
      />
    </div>
  );
};
