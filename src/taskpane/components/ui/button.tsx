import React from "react";

export const Button = ({ variant = "", className = "", onClick, children }) => {
  switch (variant) {
    case "link":
      return (
        <a className={`${className}`} onClick={onClick}>
          {children}
        </a>
      );
    default:
      return (
        <button
          className={`${"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"} ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      );
  }
};
