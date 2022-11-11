import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import { useUserAuthContext } from "../store/authContext";
import "../styles/Login.css";

const SignUpPage = () => {
  const { user, setUser, signInForm, isLoading } = useUserAuthContext();
  const { name, email, password } = user;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <section className="loginBar">
      <div className="loginCard">
        <h1>Sign Up</h1>

        <div className="loginWrap">
          <form onSubmit={signInForm}>
            <div className="formInput">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="formInput">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="formInput">
              <input
                type={!showPassword ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <div className="passEye">
                {!showPassword ? (
                  <BsEyeFill onClick={() => setShowPassword(true)} />
                ) : (
                  <BsEyeSlashFill onClick={() => setShowPassword(false)} />
                )}
              </div>
            </div>

            <div className="formButton">
              <button disabled={isLoading}>
                {isLoading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="loginAction">
            <div className="loginRegister">
              <p>Already have an account?</p>
              <Link to="/login">
                <span>Sign In</span>
              </Link>
            </div>

            <Link to="/forget-password">
              <p className="loginForget">Forget password?</p>
            </Link>
          </div>

          <div className="loginOr">
            <div className="loginLine"></div>
            <p>OR</p>
            <div className="loginLine"></div>
          </div>

          <GoogleAuth />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
