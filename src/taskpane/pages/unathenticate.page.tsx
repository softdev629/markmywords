import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../components/button";

const UnathenticatePage: React.FC = () => {
  const history = useHistory();

  return (
    <div className="h-full w-full">
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background text-foreground relative justify-center items-center">
        <div className="mb-2 text-xl">
          <span>You are not registered. Go to </span>
          <a style={{ color: "blue" }} href="https://dev.markmywords.tech/auth/sign-in?callbackUrl=%2F">
            Signup
          </a>
        </div>
        <Button onClick={() => history.push("/")}>Back to Login</Button>
      </div>
    </div>
  );
};

export default UnathenticatePage;
