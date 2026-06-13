import "../auth.form.scss";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";
const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  if (loading) {
    return (
      <main>
        <div class="loader"></div>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
            />

            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="password"
              placeholder="Enter password"
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
