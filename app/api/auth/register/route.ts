import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { auth, db } from '@/lib/firebase/admin'
import { serverTimestamp } from "firebase/firestore";

interface UserRequest {
    fullname: string
    email: string
    password: string
}

export async function POST(request: NextRequest) {
    const { fullname, email, password } = await request.json() as UserRequest

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await auth.getUserByEmail(email).catch(() => null)
        if (existingUser) {
            return NextResponse.json({ 
                success: false, 
                message: "Email already exists" 
            })
        }

        const newUser = await auth.createUser({
            email,
            password,
            displayName: fullname,
        })

        await db.collection('users').doc(newUser.uid).set({
            fullname,
            email,
            password: hashedPassword,
            profile: {
                picture: '/profile-default.png',
                role: email.startsWith("gtrskyline") ? 'admin' : 'member',
                bio: 'Im using notes',
            },
            preferences: {
                theme: 'light',
                language: 'en',
            },
            createdAt: serverTimestamp(),
        })

        return NextResponse.json({ 
            success: true, 
            message: 'Register success' 
        })
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Register failed' 
        })
    }
}