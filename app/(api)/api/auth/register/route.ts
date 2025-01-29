
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from "path";
import { createUser } from "@/lib/firebase/service";

interface Preferences {
    theme: string
    language: string
}

interface Profiles {
    picture: string
    bio: string
    role: string
}

interface User {
    fullname: string
    email: string
    password: string
    profile: Profiles
    preferences: Preferences
    createdAt: string
}

interface UserRequest {
    fullname: string
    email: string
    password: string
}
  
export async function POST(request: NextRequest) {
    const { fullname, email, password } = await request.json() as UserRequest

    try {
        const hashedPassword: string = await bcrypt.hash(password, 10)
        const user: User = {
            fullname,
            email,
            password: hashedPassword,
            profile: {
                picture: '/profile-default.png',
                role: email.startsWith('gtrskyline') ? 'admin' : 'member',
                bio: 'Im using notes',
            },
            preferences: {
                theme: 'light',
                language: 'en'
            },
            createdAt: new Date().toISOString(),
        }

        const response = await createUser(user)

        return NextResponse.json({
            status: response.status,
            statusCode: response.statusCode,
            message: response.message
        })
    } catch (err) {
        return NextResponse.json({
            status: false,
            statusCode: 404,
            message: 'Check your connections'
        })
    }
}