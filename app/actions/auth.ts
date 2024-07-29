"use server";

import { authService } from "../domain/services/auth-service";
import { TLoginDTO } from "../infrastructure/http/dto/authDTO";
import { authRepository } from "../infrastructure/repositories/auth-repository";
const authAction = () => ({
  login: async (params: TLoginDTO) => {
    const resp = await authService(authRepository).login(params);
    return resp;
  },
});
