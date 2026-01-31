import { useState } from "react";
import { signup, login } from "../api";
import { useNavigate } from "react-router-dom";

type Props = { onAuthSuccess: (token: string) => void };

export function LandingPage({ onAuthSuccess }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const onSignUp = async () => {
    try {
      const data = await signup(name, email, password);
      onAuthSuccess(data.token);
      console.log("User created!");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/homepage");
  
    } catch (e) {
      console.error("Error during signup:", e);
      setName("");
      setEmail("");
      setPassword("");
  
    }
  };
  const onLogIn = async () => {
    try {
      const data = await login(email, password);
      onAuthSuccess(data.token);
      navigate("/homepage");
      console.log("User logged in!");
      setEmail("");
      setPassword("");

    } catch (e) {
      console.error("Login error:", e);
    }
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form autoComplete="off">
          <h1>Create Account</h1>
          <input type="text" autoComplete="off" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="email" autoComplete="off" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" autoComplete="off" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="button" onClick={onSignUp}>Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={(e) => {e.preventDefault(); onLogIn()}} autoComplete="off">
          <h1>Sign in</h1>
          <input type="email" autoComplete="off" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" autoComplete="off" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <a href="#">Forgot your password?</a>
          <button type="submit" onClick={onLogIn}>Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" type="button" onClick={() => setIsSignUp(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" type="submit" onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}