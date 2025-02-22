import { db } from "@/lib/firebase/admin";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { noteID, folderID } = await request.json()
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        if (!noteID || !folderID) {
            return NextResponse.json({
                success: false,
                message: 'Note ID and Folder ID not found'
            })
        }

        const userID: any = token.id

        if (!userID) {
            return NextResponse.json({
                success: false,
                message: 'User ID not found'
            })
        }

        const noteRef = db
            .collection('users')
            .doc(userID)
            .collection('notes')
            .doc(noteID)

        const noteSnap = await noteRef.get()

        if (!noteSnap.exists) {
            return NextResponse.json({
                success: false,
                message: 'Notes not found'
            })
        }

        const folderNoteRef = db
            .collection('users')
            .doc(userID)
            .collection('folders')
            .doc(folderID)
            .collection('notes')
            .doc(noteID)

        const folderNoteSnap = await folderNoteRef.get()

        if (folderNoteSnap.exists) {
            return NextResponse.json({
                success: false,
                message: 'Note already exists in folder'
            })
        }

        const noteData: any = noteSnap.data()

        await folderNoteRef.set(noteData)

        return NextResponse.json({
            success: true,
            message: 'Notes added to folder'
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}