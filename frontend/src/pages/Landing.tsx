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
  const [mode, setMode] = useState<"default" | "forgot">("default");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);


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

  const onForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage(null);
    setForgotMessage("If the email exists, we will send you instructions.");
    setForgotEmail("");
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form autoComplete="off">
          <h1>Create Account</h1>
          <input type="text" autoComplete="off" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" autoComplete="off" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" autoComplete="off" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onClick={onSignUp}>Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        {mode === "forgot" ? (
          <form onSubmit={onForgotSubmit} autoComplete="off">
            <h2>Forgot password</h2>
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <div style={{ minHeight: 24, marginTop: 12, marginBottom: 12 }}>
              {forgotMessage && <p style={{ margin: 0 }}>{forgotMessage}</p>}
            </div>
            {!forgotMessage ? (
              <button type="submit">Send</button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMode("default");
                  setForgotMessage(null);
                  setForgotEmail("");
                }}
              >
                Back
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(), onLogIn() }} autoComplete="off">
            <h1>Log in</h1>
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("forgot");
                setForgotEmail(email);
                setForgotMessage(null);
              }}
            >
              Forgot your password?
            </a>
            <button type="submit">Log In</button>
          </form>
        )}
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" type="button" onClick={() => setIsSignUp(false)}>
              Log In
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