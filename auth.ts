import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // const parsedCredentials = z
        //   .object({ email: z.string(), password: z.string().min(4) })
        //   .safeParse(credentials);

        const { email, password } = credentials;
        // wrong id
        const response = await fetch(`http://localhost:5000/api/persons/${email}`, { cache: 'no-cache' });
        const user = await response.json();
        // console.log(user);
        // const user = await getUser(email);
        // if (!user) return null;
        // console.log('Invalid credentials');
        return user;
      },
    }),
  ],
});