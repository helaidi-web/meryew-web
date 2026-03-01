import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getDatabase } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const db = await getDatabase();
        
        return new Promise((resolve, reject) => {
          db.get(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email],
            async (err, user: any) => {
              if (err) {
                reject(err);
                return;
              }

              if (!user) {
                resolve(null);
                return;
              }

              const passwordMatch = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (passwordMatch) {
                resolve({
                  id: user.id.toString(),
                  email: user.email,
                  name: user.name,
                });
              } else {
                resolve(null);
              }
            }
          );
        });
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
