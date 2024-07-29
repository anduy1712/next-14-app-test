"use client";
import React, { useState } from "react";
import "./styles.css";
import { authService } from "@/app/domain/services/auth-service";
import { authRepository } from "@/app/infrastructure/repositories/auth-repository";
import { redirect, useRouter } from "next/navigation";

const Login = () => {
  const [name, setName] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const router = useRouter();

  const handleLogin = async () => {
    const params = {
      username: name,
      password,
    };
    const { status } = await authService(authRepository).login(params);
    console.log({ params });

    if (status === 200) {
      router.push("/user");
    }
  };
  return (
    <div className="login">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => {
          const { value } = e.target;
          setName(value);
        }}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => {
          const { value } = e.target;
          setPassword(value);
        }}
      />
      <button onClick={handleLogin}>Submit form</button>
    </div>
  );
};

export default Login;
