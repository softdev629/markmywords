import React, { useState } from "react";

const Feedback = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    await Word.run(async (context) => {
      const commentObj: Word.Comment = context.document.getSelection().insertComment(comment);

      // Load object to log in the console.
      commentObj.load();
      await context.sync();

      console.log("Comment inserted:", commentObj);
      setComment("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Give a feedback</h3>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Give</button>
    </form>
  );
};

export default Feedback;
