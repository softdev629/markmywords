import * as React from "react";

const RealTimeAssessment = ({ skill, level }) => {
  const color = level > 75 ? "green" : level > 50 ? "yellow" : "red";

  return (
    <div>
      <h4>{skill}</h4>
      <div style={{ width: "100%", backgroundColor: "#ccc" }}>
        <div style={{ width: `${level}%`, backgroundColor: color, height: "10px" }}></div>
      </div>
    </div>
  );
};

export default RealTimeAssessment;
