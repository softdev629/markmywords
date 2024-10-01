import * as React from "react";

const SkillList = ({ skills }) => {
  return (
    <div>
      <h3>Writing Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
