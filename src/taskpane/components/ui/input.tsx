import React from "react";

export const Input = ({ value, onChange, placeholder, className }) => {
  return <input value={value} onChange={onChange} placeholder={placeholder} className={className} />;
};
