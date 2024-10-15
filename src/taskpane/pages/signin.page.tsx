import React from "react";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";

import { Button } from "../components/button";
import { toast } from "react-toastify";

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
        fetch("http://localhost:8000/api/signin", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then(({ data }) => {
            if (data.exists) {
              history.push("/annotate");
              toast.success("Signin successfully!");
            } else {
              history.push("/unathenticate");
              toast.error("You are not registerd!");
            }
          });
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
