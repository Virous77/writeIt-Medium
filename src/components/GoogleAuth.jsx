import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useUserAuthContext } from "../store/authContext";

const GoogleAuth = () => {
  const { loginGoogle, googleLoading } = useUserAuthContext();
  return (
    <div className="loginGoogle">
      <button onClick={loginGoogle}>
        {googleLoading ? (
          "Processing..."
        ) : (
          <span>
            <FcGoogle className="googleIcon" />
            Continue with google
          </span>
        )}
      </button>
    </div>
  );
};

export default GoogleAuth;
