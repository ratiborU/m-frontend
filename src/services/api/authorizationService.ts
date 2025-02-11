'use server'
import { cookies } from "next/headers";
import { api } from "./api";

export type TLoginRequest = {
  email: string,
  password: string
}

export type TLoginResponse = {
  tokens: {
    accessToken: string,
    refreshToken: string
  }
}

export type TRegistrationRequest = {
  firstName: string,
  secondName: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  password: string,
}

export type TRegistrationResponse = {
  tokens: {
    accessToken: string,
    refreshToken: string
  }
}

type TTokens = {
  accessToken: string,
  refreshToken: string
}

const setCookies = (tokens: TTokens) => {
  const accessExpiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 дней
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

export const login = async (data: TLoginRequest, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const response = await api({
    link: 'persons/login',
    type: "POST",
    data,
    onSuccess: (data: TLoginResponse) => {
      setCookies(data.tokens);
      if (onSuccess) {
        onSuccess();
      };
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      };
    }
  });
  return response;
}


export const registration = async (data: TRegistrationRequest, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const response = api({
    link: 'persons/registration',
    type: "POST",
    data,
    onSuccess: (data: TRegistrationResponse) => {
      setCookies(data.tokens);
      if (onSuccess) {
        onSuccess();
      };
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      };
    }
  });
  return response;
}


export const refresh = async (data: TRegistrationRequest, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const response = api({
    link: 'persons/refresh',
    type: "POST",
    data,
    onSuccess: (data: TRegistrationResponse) => {
      setCookies(data.tokens);
      if (onSuccess) {
        onSuccess();
      };
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      };
    }
  });
  return response;
}