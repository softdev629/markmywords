import React, { useEffect, useRef } from "react";

export const ScrollArea = ({ className, children }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [children]);

  return (
    <div ref={boxRef} className={`overflow-y-auto ${className}`} style={{ height: "calc(100vh - 330px)" }}>
      {children}
    </div>
  );
};
