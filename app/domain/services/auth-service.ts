import {
  TLoginDTO,
  TLoginResponseDTO,
} from "@/app/infrastructure/http/dto/authDTO";
import { TAuthRepository } from "../repositories/auth-repository";

export const authService = (repository: TAuthRepository) => ({
  login: (params: TLoginDTO) => {
    const login = repository.login(params);
    return login;
  },
  me: () => {
    const login = repository.me();
    return login;
  },
});
