import { db } from "@/lib/firebase/admin";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
        const searchParams = request.nextUrl.searchParams
        const folderID = searchParams.get('id')

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        if (!folderID) {
            return NextResponse.json({
                success: false,
                message: 'Folder ID not found'
            })
        }

        const userID: any = token.id

        if (!userID) {
            return NextResponse.json({
                success: false,
                message: 'User ID not found'
            })
        }

        const folderNotesSnap = await db
            .collection("users")
            .doc(userID)
            .collection("folders")
            .doc(folderID)
            .collection("notes")
            .get()
        
        const notes = folderNotesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json({
            success: true,
            message: 'Success to get notes',
            data: notes
        })

    } catch (err) {
        console.error(err)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}
