import React from "react";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";

import { Button } from "../components/button";

const SigninPage: React.FC = () => {
  const history = useHistory();

  const getIdToken = async () => {
    try {
      let userTokenEncoded = await Office.auth.getAccessToken({
        allowSignInPrompt: true,
        allowConsentPrompt: true,
        forMSGraphAccess: true,
      });
      let userToken = jwtDecode(userTokenEncoded);
      const email = userToken["preferred_username"];
      if (email) {
        fetch("https://dev.markmywords.tech/api/admin/email", {
          method: "POST",
          headers: {
            Authentication: "Bearer 01923272-490c-7fa4-ba32-a7af7235be06",
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.exists) history.push("/annotate");
            else history.push("/unathenticate");
          });
        history.push("/unathenticate");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background text-foreground relative justify-center items-center">
        <Button onClick={getIdToken}>Sign in with Microsoft</Button>
      </div>
    </div>
  );
};

export default SigninPage;
