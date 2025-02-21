'use server'
import { cookies } from "next/headers";
import { api } from "./api";

type TLoginRequest = {
  email: string,
  password: string
}

type TLoginResponse = {
  tokens: {
    accessToken: string,
    refreshToken: string
  }
}

type TRegistrationRequest = {
  firstName: string,
  secondName: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  password: string,
}

type TRegistrationResponse = {
  tokens: {
    accessToken: string,
    refreshToken: string
  }
}

type TTokens = {
  accessToken: string,
  refreshToken: string
}

export const setCookies = (tokens: TTokens) => {
  // console.log(tokens.accessToken);
  // console.log(tokens.refreshToken);
  const accessExpiresAt = new Date(Date.now() + 1 * 1 * 1 * 20 * 1000); // 1 дней
  const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней

  cookies().set("access", tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessExpiresAt,
  });
  cookies().set("refresh", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
  });
}

export const login = async (data: TLoginRequest) => {
  // const body = JSON.stringify(data);
  const response = await api('persons/login', {
    type: "POST",
    data: JSON.stringify(data),
    onSuccess: (data: TLoginResponse) => {
      setCookies(data.tokens);
    },
  });
  return response;
}


export const registration = async (data: TRegistrationRequest) => {
  const response = api('persons/registration', {
    type: "POST",
    data: JSON.stringify(data),
    onSuccess: (data: TRegistrationResponse) => {
      setCookies(data.tokens);
    },
  });
  return response;
}


export const refresh = async () => {
  const refresh = cookies().get('refresh')?.value;
  const response = await api('persons/refresh', {
    type: "POST",
    data: JSON.stringify({
      refreshToken: refresh
    }),
    isRefresh: true,
    onSuccess: () => {
      // console.log(data.tokens);
      // setCookies(data.tokens);
    },
  });
  return response;
}