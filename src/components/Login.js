import React from "react";
import { Button } from "@material-ui/core";
import "../CSS/Login.css";
import { auth, provider } from "../features/firebase";

function Login() {
  const SignIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png"
        alt="discord"
      />

      <Button onClick={SignIn}>Google Acc Sign in</Button>
      {/* <Button>Create Account</Button> */}
    </div>
  );
}

export default Login;
