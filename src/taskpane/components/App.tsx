import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";

import TaskTypeSelector from "./TaskTypeSelector";
import SkillList from "./SkillList";
import RealTimeAssessment from "./RealTimeAssessment";
import ChatInterface from "./ChatInterface";
import Feedback from "./Feedback";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    padding: "20px",
  },
});

const App: React.FC<AppProps> = () => {
  const [skills, setSkills] = useState([]);
  const styles = useStyles();

  const handleTaskSelect = (task) => {
    // Assume taskTypeSkillsMap is an object mapping task types to skills arrays
    const taskTypeSkillsMap = {
      essay: ["Thesis Statement", "Argument Development", "Conclusion"],
      report: ["Data Analysis", "Executive Summary", "Methodology"],
      creative: ["Imagery", "Narrative Structure", "Character Development"],
    };

    setSkills(taskTypeSkillsMap[task] || []);
  };

  return (
    <div className={styles.root}>
      <TaskTypeSelector onSelectTask={handleTaskSelect} />
      <SkillList skills={skills} />
      <RealTimeAssessment skill="Thesis Statement" level={80} />
      <RealTimeAssessment skill="Argument Development" level={60} />
      <ChatInterface />
      <Feedback />
    </div>
  );
};

export default App;
