"use client";

import { useState } from "react";

import { useAdminLogin } from "../model/user-admin-login";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const { login, loading, error } = useAdminLogin();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginFailed(false);

    const success = await login(email, password);

    if (!success) {
      setLoginFailed(true);
      return;
    }

    router.push("/users");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {loginFailed && <p>Login failed</p>}
      {error && <p>Request error</p>}
    </form>
  );
};
