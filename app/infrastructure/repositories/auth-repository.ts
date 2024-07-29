import { TAuthRepository } from "@/app/domain/repositories/auth-repository";
import { TGetMeDTO, TLoginResponseDTO } from "../http/dto/authDTO";
import { http } from "../instances/http";

export const authRepository: TAuthRepository = {
  login: async (params) => {
    const rs = await http.post<TLoginResponseDTO>("/auth/login", {
      body: params,
    });

    return rs;
  },
  me: async () => {
    const rs = await http.get<TGetMeDTO>(
      "auth/me"
    );
    return rs;
  },
};
