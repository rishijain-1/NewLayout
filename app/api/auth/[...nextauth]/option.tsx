import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
         
          const loginUrl = `${process.env.API_URL}/auth/login`; // Rewritten to ensure it's clean
        

          const res = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const data = await res.json();

          if (res.ok && data.token) {
            return { token: data.token, email: credentials?.email };
          } else {
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          console.error(error);
          throw new Error((error as Error).message || "An unexpected error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token.toString();
     
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // URL of the login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);