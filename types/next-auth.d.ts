import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: {}; // Add the accessToken to the session
  }

  interface Token extends DefaultJWT {
    accessToken?: string; // Add the accessToken to the token
  }
  interface User {
    id?: string;
    email?: string;
    token?: string;
  }
}
