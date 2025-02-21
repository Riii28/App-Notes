import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { db } from '@/lib/firebase/admin'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 2592000
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password')
        }

        const { email, password } = credentials
        try {
          const usersRef = db.collection('users')
          const snapshot = await usersRef.where('email', '==', email).get()

          if (snapshot.empty) {
            throw new Error('Invalid email or password')
          }

          const user = snapshot.docs[0]?.data()

          if (!user) {
            throw new Error('Invalid email or password')
          }  

          const isPasswordValid = await compare(password, user.password)
          if (!isPasswordValid) {
            throw new Error('Invalid email or password')
          }
  
          return {
            id: snapshot.docs[0].id,
            email: user.email,
            fullname: user.fullname,
            role: user.profile?.role,
            theme: user.preferences?.theme
          }
  
        } catch (err) {
          console.error(err)
          throw new Error('Error fetching user data')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.fullname = user.fullname
        token.role = user.role
        token.theme = user.theme
      }
      return token
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
      return session
    }
  },
  pages: {
    signIn: '/auth/sign-in' // Halaman untuk login
  }
}
