import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase/admin";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        const userID: any = token.id

        if (!userID) {
            return NextResponse.json({
                success: false,
                message: 'User ID not found'
            })
        }

        const userRef = await db
            .collection('users')
            .doc(userID)
            .get()
    
        if (!userRef.exists) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            })
        }

        const userData = userRef.data()        
        const theme = userData?.preferences.theme || 'light'

        return NextResponse.json({
            success: true,
            message: 'Success to get user theme',
            data: theme
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
        const { theme } = await request.json()

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        const userID: any = token.id

        if (!userID) {
            return NextResponse.json({
                success: false,
                message: 'User ID not found'
            })
        }

        if (!['light', 'dark'].includes(theme)) {
            return NextResponse.json({
                success: false,
                message: 'Theme not found'
            })
        }

        const userRef = db
            .collection('users')
            .doc(userID)

        await userRef.update({
            'preferences.theme': theme
        })

        return NextResponse.json({
            success: true,
            message: 'Theme updated successfully'
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}