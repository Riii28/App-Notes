import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase/admin";
import { getToken } from "next-auth/jwt";
import { revalidateTag } from "next/cache";

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

        const existingFolder = await db
            .collection('users')
            .doc(userID)
            .collection('folders')
            .where('name', '==', folder)
            .get()

        if (!existingFolder.empty) {
            return NextResponse.json({
                success: false,
                message: 'Folder name already exsists'
            })
        }
        
        const folderData = { 
            name: folder, 
            createdAt: new Date().toISOString() 
        }

        await db
            .collection('users')
            .doc(userID)
            .collection('folders')
            .add(folderData)

        revalidateTag('folders')

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

        const foldersSnapshot = await db
            .collection('users')
            .doc(userID)
            .collection('folders')
            .get()

        const folders = foldersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json({
            success: true,
            message: 'Get folder success',
            data: folders
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
        const { name, folderID } = await request.json()
    } catch (err) {

    }
}