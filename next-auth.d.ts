import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            fullname: string;
            role: string;
            theme: string
        };
    }

    interface JWT {
        id: string;
        email: string;
        fullname: string;
        role: string;
        theme: string
    }
}

