"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import { TGetMeDTO } from "@/app/infrastructure/http/dto/authDTO";
import { authService } from "@/app/domain/services/auth-service";
import { authRepository } from "@/app/infrastructure/repositories/auth-repository";

const User = () => {
  const [info, setInfo] = useState<TGetMeDTO>({
    firstName: "",
    lastName: "",
  });

  const getInfo = async () => {
    const info = await authService(authRepository).me();
    setInfo(info.data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="user">
      <h1>
        Fullname: {info.firstName} + {info.lastName}
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, velit.
      </p>
    </div>
  );
};

export default User;
