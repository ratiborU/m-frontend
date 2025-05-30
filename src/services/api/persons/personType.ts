'use client'

export type TPerson = {
  id: string,
  firstName: string,
  secondName: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: string,
  isActivated: boolean,
  activationLink: string,
  createdAt: string,
  updatedAt: string,
}

export type TPersonCreate = {
  // id: string,
  firstName: string,
  secondName: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role?: string,
}

export type TPersonUpdate = {
  id: string,
  firstName?: string,
  secondName?: string,
  fatherName?: string,
  email?: string,
  phoneNumber?: string,
  password?: string,
  role?: string,
  isActivated?: boolean,
  activationLink?: string,
  createdAt?: string,
  updatedAt?: string,
}

export type TLogin = {
  email: string,
  password: string,
}

export type IAuthResponse = {
  accessToken: string;
  refreshToken: string;
};