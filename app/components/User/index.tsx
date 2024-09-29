"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import { TGetMeDTO } from "@/app/infrastructure/http/dto/authDTO";
import { authService } from "@/app/domain/services/auth-service";
import { authRepository } from "@/app/infrastructure/repositories/auth-repository";
import { toast } from "react-toastify";
import { handleErrorApi } from "@/app/lib/utils";

const User = () => {
  const [info, setInfo] = useState<TGetMeDTO>({
    firstName: "",
    lastName: "",
  });

  const getInfo = async () => {
    try {
      const info = await authService(authRepository).me();
      setInfo(info.data);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="user">
      <h1>
        Fullname:{" "}
        <span style={{ color: "red" }}>
          {info.firstName} + {info.lastName}
        </span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, velit.
      </p>
      <button onClick={notify}>Click toast</button>
    </div>
  );
};

export default User;
