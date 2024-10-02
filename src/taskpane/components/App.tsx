import React, { useState, useEffect } from "react";
import { MessageSquare, FileText, BarChart2, Zap, History, Send } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Select, SelectItem } from "./ui/select";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";

const taskTypes = [
  { value: "creative", label: "Creative Writing" },
  { value: "persuasive", label: "Persuasive Essay" },
  { value: "analytical", label: "Analytical Response" },
  { value: "research", label: "Research Paper" },
];

const skillSets = {
  creative: [
    { name: "Creativity", score: 75 },
    { name: "Narrative Structure", score: 68 },
    { name: "Character Development", score: 82 },
    { name: "Descriptive Language", score: 70 },
    { name: "Emotional Impact", score: 65 },
  ],
  persuasive: [
    { name: "Argumentation", score: 72 },
    { name: "Evidence Use", score: 68 },
    { name: "Logical Flow", score: 75 },
    { name: "Persuasive Techniques", score: 70 },
    { name: "Counter-Arguments", score: 65 },
  ],
  analytical: [
    { name: "Critical Thinking", score: 78 },
    { name: "Text Analysis", score: 72 },
    { name: "Interpretation", score: 70 },
    { name: "Supporting Evidence", score: 75 },
    { name: "Analytical Structure", score: 68 },
  ],
  research: [
    { name: "Research Depth", score: 70 },
    { name: "Source Credibility", score: 75 },
    { name: "Citation Accuracy", score: 68 },
    { name: "Synthesis of Information", score: 72 },
    { name: "Academic Writing Style", score: 70 },
  ],
};

const App: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState("creative");
  const [currentSkills, setCurrentSkills] = useState(skillSets.creative);
  const [drafts, setDrafts] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const [tabKey, setTabKey] = useState("analyze");

  useEffect(() => {
    setCurrentSkills(skillSets[selectedTask]);
  }, [selectedTask]);

  const handleAnnotate = async () => {
    console.log("Annotating document for task type:", selectedTask);
    // Here you would call the Mark My Words API to annotate the document based on the selected task type

    await Word.run(async (context) => {
      const commentObj: Word.Comment = context.document.getSelection().insertComment("Commented");

      // Load object to log in the console.
      commentObj.load();
      await context.sync();

      console.log("Comment inserted:", commentObj);
    });
  };

  const handleSubmitDraft = () => {
    const newDraft = {
      id: drafts.length + 1,
      date: new Date().toLocaleDateString(),
      skills: currentSkills,
    };
    setDrafts([...drafts, newDraft]);

    // Update progress data
    const averageScore = currentSkills.reduce((sum, skill) => sum + skill.score, 0) / currentSkills.length;
    setProgressData([...progressData, { draft: newDraft.id, score: averageScore }]);

    console.log("Submitting draft:", newDraft);
    // Here you would send the draft to your backend/API
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { text: "This is a sample response.", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background text-foreground">
        <Card className="border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Mark My Words</CardTitle>
            <p className="text-sm text-muted-foreground">AI-powered analysis for your writing tasks</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={setSelectedTask} defaultValue={selectedTask}>
              {taskTypes.map((task) => (
                <SelectItem key={task.value} value={task.value}>
                  {task.label}
                </SelectItem>
              ))}
            </Select>
            <div className="flex space-x-2">
              <Button className="flex-1" onClick={handleAnnotate}>
                <Zap className="mr-2 h-4 w-4" /> Annotate
              </Button>
              <Button className="flex-1" onClick={handleSubmitDraft}>
                <Send className="mr-2 h-4 w-4" /> Submit Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs className="flex-grow flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger type={tabKey === "analyze" ? "active" : "inactive"} onClick={() => setTabKey("analyze")}>
              <BarChart2 className="mr-2 h-4 w-4" /> Analyze
            </TabsTrigger>
            <TabsTrigger type={tabKey === "progress" ? "active" : "inactive"} onClick={() => setTabKey("progress")}>
              <History className="mr-2 h-4 w-4" /> Progress
            </TabsTrigger>
            <TabsTrigger type={tabKey === "chat" ? "active" : "inactive"} onClick={() => setTabKey("chat")}>
              <MessageSquare className="mr-2 h-4 w-4" /> Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent show={tabKey === "analyze"} className="flex-grow flex flex-col space-y-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment for {taskTypes.find((t) => t.value === selectedTask)?.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentSkills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-medium">{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent show={tabKey === "progress"} className="flex-grow flex flex-col space-y-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="draft" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submitted Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {drafts.map((draft, index) => (
                    <div key={index} className="mb-2 p-2 border rounded">
                      <div className="font-medium">Draft {draft.id}</div>
                      <div className="text-sm text-muted-foreground">{draft.date}</div>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => console.log("View details for Draft", draft.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent show={tabKey === "chat"} className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow p-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-secondary text-secondary-foreground"
                  } max-w-[80%]`}
                >
                  {msg.text}
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t flex">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-2"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
