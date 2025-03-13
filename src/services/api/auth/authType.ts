import { TPerson } from "../persons/personType"

export type TLoginRequest = {
  email: string,
  password: string
}

export type TLoginResponse = {
  tokens: {
    accessToken: string,
    refreshToken: string
  },
  person: TPerson
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

export type TTokens = {
  accessToken: string,
  refreshToken: string
}