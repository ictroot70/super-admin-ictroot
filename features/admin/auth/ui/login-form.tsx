"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminLogin } from "../model/user-admin-login";

export const LoginForm = () => {
  const router = useRouter();
  const { login, loading, error } = useAdminLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div
      className="flex min-h-screen items-center justify-center bg-black px-4"
      style={{ fontFamily: "Inter, Arial, sans-serif" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex h-[348px] w-[378px] flex-col border border-[#333333] bg-[#171717] px-7 pt-6 pb-6"
      >
        <h1 className="mb-8 text-center text-[20px] leading-[36px] font-bold text-white">
          Sign In
        </h1>

        <label
          htmlFor="email"
          className="mb-1 text-[14px] leading-[24px] font-normal text-[#8d9094]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Epam@epam.com"
          className="mb-4 h-[36px] w-[330px] border border-[#333333] bg-[#171717] px-3 text-[16px] leading-[24px] font-normal text-white outline-none placeholder:text-[#8d9094]"
        />

        <label
          htmlFor="password"
          className="mb-1 text-[14px] leading-[24px] font-normal text-[#8d9094]"
        >
          Password
        </label>
        <div className="relative mb-6 w-[330px]">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="****************"
            className="h-[36px] w-[330px] border border-[#333333] bg-[#171717] px-3 pr-10 text-[16px] leading-[24px] font-normal text-white outline-none placeholder:text-[#8d9094]"
          />
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/90">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-[36px] w-[330px] rounded-[2px] bg-[#397DF6] px-6 py-[6px] text-[16px] leading-[24px] font-semibold text-white disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {loginFailed && (
          <p className="mt-3 text-sm text-red-400">Login failed</p>
        )}
        {error && <p className="mt-2 text-sm text-red-400">Request error</p>}
      </form>
    </div>
  );
};
