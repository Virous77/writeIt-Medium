import React from "react";
import "../styles/Login.css";
import { useUserAuthContext } from "../store/authContext";

const ForgetPassPage = () => {
  const { user, setUser, forgetForm, isLoading } = useUserAuthContext();
  const { email } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <section className="loginBar">
      <div className="loginCard">
        <h1>Forget Password</h1>

        <div className="loginWrap">
          <form onSubmit={forgetForm}>
            <div className="formInput">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="formButton">
              <button>{isLoading ? "Processing..." : "Submit"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassPage;
