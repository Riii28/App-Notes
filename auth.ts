import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { signIn } from "@/lib/firebase/service";

export const { auth, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user: any = await signIn(credentials.email);
        if (!user) throw new Error("Invalid email or password");

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid email or password");

        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.profile?.role,
          theme: user.preferences.theme,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
        token.theme = user.theme;
      }
      return token;
    },
    async session({ token, session }: any) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          fullname: token.fullname,
          role: token.role,
          theme: token.theme,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
