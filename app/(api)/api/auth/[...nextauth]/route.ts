// import { handlers } from "@/auth"; // Import dari auth.ts

// export { handlers as GET, handlers as POST };


import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { signIn } from "@/lib/firebase/service"; // Pastikan fungsi ini valid dan sesuai

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt', // Menggunakan JWT untuk sesi
    },
    secret: process.env.JWT_SECRET, // Pastikan ini sudah diatur di .env
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Missing email or password');
                    }

                    const { email, password } = credentials;

                    const user: any = await signIn(email);

                    if (!user) {
                        throw new Error('Invalid email or password');
                    }

                    const isPasswordValid = await compare(password, user.password)
                    if (!isPasswordValid) {
                        throw new Error('Invalid email or password')
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        fullname: user.fullname,
                        role: user.profile?.role,
                        theme: user.preferences.theme
                    };
                } catch (error) {
                    throw new Error("Authentication failed")
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role
                token.theme = user.theme
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
                    theme: token.theme
                }
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/sign-in', // Halaman untuk login
    },
};

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
};
