import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase/admin";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
    try {
        const { folder } = await request.json()
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized access!'
            })
        }

        if (!folder) {
            return NextResponse.json({
                success: false,
                message: 'Name folder cannot be empty!'
            })
        }

        const userID: any = token.id

        if (!userID) {
            return NextResponse.json({
                success: false,
                message: 'User ID not found!'
            })
        }

        await db
            .collection('users')
            .doc(userID)
            .collection('folders')
            .add({ folder })

        return NextResponse.json({
            success: true,
            message: 'New folder added!'
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error!'
        })
    }
}