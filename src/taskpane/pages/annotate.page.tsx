import React, { useState } from "react";
import { MessageSquare, BarChart2, Zap, History, Send } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Select, SelectItem } from "../components/select";
import { Progress } from "../components/progress";
import { ScrollArea } from "../components/scroll-area";

const taskTypes = [
  { value: "creative", label: "Creative Writing" },
  { value: "persuasive", label: "Persuasive Essay" },
  { value: "informative", label: "Informative Writing" },
];

const skillSets = {
  creative: ["Introduction", "Audience", "Descriptive Language", "Characterisation", "Dialogue", "Expression"],
  persuasive: ["Stance", "Readers", "Reasons", "Evidence", "Appeal", "Counterpoints", "Action", "Techniques"],
  informative: ["Topic", "Audience", "Facts", "Organisatione", "Examples", "Objectivity"],
};

const AnnotationPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState("creative");
  const [currentSkills, setCurrentSkills] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [tabKey, setTabKey] = useState("analyze");
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState<{ subpart; comment }[]>([]);
  const [context, setContext] = useState("");

  const handleAnnotate = async () => {
    setLoading(true);
    await Word.run(async (context) => {
      // Get the whole body of the document
      const documentBody = context.document.body;

      // Load the text content of the body
      documentBody.load("text");

      // Synchronize the context state with the document
      await context.sync();

      // Retrieve and log the full text content
      const wholeText = documentBody.text;
      setContext(wholeText);

      console.log({ context: wholeText, task: selectedTask, skillSet: skillSets[selectedTask] });

      fetch("http://localhost:8000/api/annotate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: wholeText, task: selectedTask, skillSet: skillSets[selectedTask] }),
      })
        .then((res) => res.json())
        .then(
          async ({
            data,
          }: {
            data: { graph: { name: string; score: string }[]; improve: { subpart: string; comment: string }[] };
          }) => {
            console.log(data);
            setAnnotations(data.improve);
            setCurrentSkills(data.graph);
            for (let item of data.improve) {
              const searchResults: Word.RangeCollection = context.document.body.search(item.subpart);
              const firstResult = searchResults.getFirstOrNullObject();
              if (firstResult) firstResult.insertComment(item.comment);
              await context.sync();
            }
            setLoading(false);
            toast.success("Annotation complete successfully!", { position: "top-right" });
          }
        );
    });
  };

  const handleSubmitDraft = () => {
    const newDraft = {
      id: drafts.length + 1,
      date: new Date().toLocaleDateString(),
      // skills: currentSkills,
    };
    setDrafts([...drafts, newDraft]);

    // Update progress data
    // const averageScore = currentSkills.reduce((sum, skill) => sum + skill.score, 0) / currentSkills.length;
    // setProgressData([...progressData, { draft: newDraft.id, score: averageScore }]);

    console.log("Submitting draft:", newDraft);
    // Here you would send the draft to your backend/API
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { text: inputMessage, sender: "user" }]);

      let reqData = {
        context,
        annotations,
        messages: [
          ...chatMessages.map((item) => ({
            role: item.sender === "bot" ? "assistant" : "user",
            content: item.text,
          })),
          {
            role: "user",
            content: inputMessage,
          },
        ],
      };

      setInputMessage("");

      fetch("http://localhost:8000/api/chat", {
        method: "POST",
        body: JSON.stringify(reqData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ data }) => setChatMessages((prev) => [...prev, { text: data.message, sender: "bot" }]));
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background text-foreground relative">
        <Card className="border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Mark My Words</CardTitle>
            <p className="text-sm text-muted-foreground">AI-powered analysis for your writing tasks</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(e) => setSelectedTask(e.target.value)} defaultValue={selectedTask}>
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
        {loading && (
          <div
            className="absolute w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <div className="lds-dual-ring" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnotationPage;
