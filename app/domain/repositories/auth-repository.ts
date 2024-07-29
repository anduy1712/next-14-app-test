import {
  TGetMeDTO,
  TLoginDTO,
  TLoginResponseDTO,
} from "@/app/infrastructure/http/dto/authDTO";
import { ResultDTO } from "@/app/lib/request";

export type TAuthRepository = {
  login: (params: TLoginDTO) => Promise<ResultDTO<TLoginResponseDTO>>;
  me: () => Promise<ResultDTO<TGetMeDTO>>;
};
