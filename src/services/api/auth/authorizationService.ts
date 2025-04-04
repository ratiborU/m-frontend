'use server'
import { cookies } from "next/headers";
import { api } from "../api";
import {
  TLoginRequest,
  TLoginResponse,
  TRegistrationRequest,
  TRegistrationResponse,
  TTokens
} from "./authType";



export const setCookies = (tokens: TTokens) => {
  const accessExpiresAt = new Date(Date.now() + 1 * 1 * 60 * 60 * 1000); // 1 дней
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
      cookies().set("personId", data.person.id, {
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      });
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
      // setCookies(data.tokens);
    },
  });
  return response;
}

export const createEmptyPerson = async () => {
  const response = api('persons/empty', {
    type: "POST",
    // onSuccess: (data: TRegistrationResponse) => {
    //   setCookies(data.tokens);
    // },
  });
  return response;
}

export const logout = async () => {
  // const body = JSON.stringify(data);
  const response = await api('persons/logout', {
    type: "POST",
    data: JSON.stringify({}),
    onSuccess: () => {
      cookies().delete('access');
      cookies().delete('refresh');
      cookies().delete('personId');
      // setCookies(data.tokens);
      // cookies().set("personId", data.person.id, {
      //   expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      // });
    },
  });
  return response;
}