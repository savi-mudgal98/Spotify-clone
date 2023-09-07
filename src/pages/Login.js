import React from "react";
import '../index.css';
import { loginEndpoint } from "./Spotify";

export default function Login() {

  return (
   <div className="login">
    <img
   
        src="/images/fitbeat.png"
        alt="spotify"
      />
  
      <button><a href={loginEndpoint}>Login</a></button>
   </div>
  );
}

