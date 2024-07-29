export type TLoginDTO = {
  username: string;
  password: string;
};

export type TGetMeDTO = {
  firstName: string;
  lastName: string;
};

export type TLoginResponseDTO = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};
