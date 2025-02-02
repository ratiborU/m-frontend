// 'use client'

// export const LocalStorageService = {
//   save: function <T>(key: string, data: T) {
//     localStorage.setItem(key, JSON.stringify(data));
//   },

//   get: function <T = unknown>(key: string): T | null {
//     const item = localStorage.getItem(key);
//     if (item != null) {
//       try {
//         return JSON.parse(item);
//       } catch {
//         throw new Error('Invalid json');
//       }
//     }
//     return null;
//   },

//   remove: function (key: string) {
//     localStorage.removeItem(key);
//   },

//   clear: function () {
//     localStorage.clear();
//   },
// };