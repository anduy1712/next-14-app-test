import { cookies } from "next/headers";
import { authService } from "../domain/services/auth-service";
import { TLoginDTO } from "../infrastructure/http/dto/authDTO";
import { authRepository } from "../infrastructure/repositories/auth-repository";
import { CustomError, THttpError } from "../lib/type";

const authApi = authService(authRepository);

export const getMe = async () => {
  const token = cookies().get("token");
  const resp = await authApi.me();
  return resp;
};

export const login = async () => {
  const token = cookies().get("token");
  const resp = await authApi.login({
    username: "admin",
    password: "123456",
    
  });
}

export const fetchTodoError = async () => {
  try {
    throw new CustomError({
      message: "CustomError: something wrong...",
      status: 405,
    });
  } catch (error) {
    throw error;
  }
};
