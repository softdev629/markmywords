import React from "react";

export const Select = ({ onValueChange, defaultValue, children }) => {
  return (
    <div className="relative">
      <select
        onChange={onValueChange}
        value={defaultValue}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
      >
        {children}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.2"
        stroke="currentColor"
        className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    </div>
  );
};

export const SelectItem = ({ value, children }) => {
  return (
    <option key={value} value={value}>
      {children}
    </option>
  );
};
