// // import { LocalStorageService } from './localStorageService.ts';
// // import { IAuthResponse } from '../../services/authService.ts';
// import { LocalStorageService } from "./localStorageService";
// import { IAuthResponse } from "@/services/types/personType";

// const USER_SECRET_KEY = 'USER_SECRET_KEY';

// export const UserSecretStorageService = {
//   save: function (secret: IAuthResponse) {
//     LocalStorageService.save(USER_SECRET_KEY, secret);
//   },

//   remove: function () {
//     LocalStorageService.remove(USER_SECRET_KEY);
//   },

//   get: function (): IAuthResponse | null {
//     return LocalStorageService.get<IAuthResponse>(USER_SECRET_KEY);
//   },

//   clear: function () {
//     LocalStorageService.clear();
//   },
// };