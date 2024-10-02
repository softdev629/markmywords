import React from "react";

export const Card = ({ className = "", children }) => {
  return <div className={`bg-card text-card-foreground rounded-xl border shadow ${className}`}>{children}</div>;
};

export const CardContent = ({ className = "", children }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
};

export const CardTitle = ({ className = "", children }) => {
  return <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
};
