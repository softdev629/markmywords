import React, { useState } from "react";

export const Tabs = ({ className, children }) => {
  return <div className={`${className}`}>{children}</div>;
};

export const TabsContent = ({ show, className, children }) => {
  return show ? <div className={`${className}`}>{children}</div> : null;
};

export const TabsList = ({ className, children }) => {
  return (
    <div
      role="tablist"
      tabIndex={0}
      className={`bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1 ${className}`}
      style={{ outline: "none" }}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ type, children, onClick }) => {
  return (
    <button
      aria-selected={type === "active"}
      data-state={type}
      className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
