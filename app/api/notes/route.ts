import { db } from "@/lib/firebase/admin";
import { getToken } from "next-auth/jwt";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { title, content, createdAt } = await request.json()
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        if (!title || !content || !createdAt) {
            return NextResponse.json({
                success: false,
                message: 'Field cannot be empty'
            })
        }

        const userID: any = token.id

        if (!userID) {
            return NextResponse.json({
                success: false,
                message: 'User ID not found'
            })
        }

        const noteData = { title, content, createdAt }
        await db
            .collection('users')
            .doc(userID)
            .collection('notes')
            .add(noteData)

        revalidateTag('notes')

        return NextResponse.json({
            success: true,
            message: 'Note added successfully!'
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
        const searchParams = request.nextUrl.searchParams
        const noteID = searchParams.get('id')

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

        if (noteID) {
            const noteDoc = await db
                .collection('users')
                .doc(userID)
                .collection('notes')
                .doc(noteID)
                .get()
                
            if (!noteDoc.exists) {
                return NextResponse.json({
                    success: false,
                    message: 'Note not found'
                })
            }
        
            return NextResponse.json({ 
                success: true, 
                message: 'Success to fetch', 
                data: {
                    id: noteDoc.id, 
                    ...noteDoc.data()
                } 
            })    
        }

        const notesSnapshot = await db
            .collection('users')
            .doc(userID)
            .collection('notes')
            .get()
    
        const notes = notesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        revalidateTag('notes')
    
        return NextResponse.json({
            success: true,
            message: 'Success to fetch all data',
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

export async function PUT(request: NextRequest) {
    try {
        const { title, content, createdAt } = await request.json()
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
        const searchParams = request.nextUrl.searchParams
        const noteID = searchParams.get('id')

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

        if (!noteID) {
            return NextResponse.json({
                success: false,
                message: 'Note ID not found'
            })
        }

        const noteRef = db
            .collection('users')
            .doc(userID)
            .collection('notes')
            .doc(noteID)
        
        const noteDoc = await noteRef.get()
        
        if (!noteDoc.exists) {
            return NextResponse.json({
                success: false,
                message: 'Note not found'
            })
        }

        await noteRef.update({
            title,
            content,
            createdAt
        })

        const foldersSnapshot = await db
            .collection('users')
            .doc(userID)
            .collection('folders')
            .get()
        
        for (const folderDoc of foldersSnapshot.docs) {
            const noteRefInFolder = folderDoc.ref.collection('notes').doc(noteID);
            const noteInFolderDoc = await noteRefInFolder.get()
            if (noteInFolderDoc.exists) {
                await noteRefInFolder.update({ title, content, createdAt })
            }
        }

        revalidateTag('notes')
                    
        return NextResponse.json({
            success: true,
            message: 'Note updated!'
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
        const searchParams = request.nextUrl.searchParams
        const noteID = searchParams.get("id")

        if (!token) {
            return NextResponse.json({ 
                success: false, 
                message: "Unauthorized access" 
            })
        }

        const userID: any = token.id
        if (!userID) {
            return NextResponse.json({ 
                success: false, 
                message: "User ID not found" 
            })
        }

        if (!noteID) {
            const notesSnapshot = await db
                .collection("users")
                .doc(userID)
                .collection("notes")
                .get()

            if (notesSnapshot.empty) {
                return NextResponse.json({ 
                    success: false, 
                    message: "No notes to delete" 
                })
            }

            const batch = db.batch()

            notesSnapshot.docs.forEach((doc) => batch.delete(doc.ref))

            const foldersSnapshot = await db
                .collection("users")
                .doc(userID)
                .collection("folders")
                .get()
            
            for (const folderDoc of foldersSnapshot.docs) {
                const notesInFolderSnapshot = await folderDoc.ref.collection("notes").get()
                
                if (!notesInFolderSnapshot.empty) {
                    notesInFolderSnapshot.docs.forEach((doc) => batch.delete(doc.ref))
                }
            }

            await batch.commit()

            revalidateTag("notes")

            return NextResponse.json({ 
                success: true, 
                message: "All notes deleted successfully!" 
            })
        }

        const noteRef = db
            .collection("users")
            .doc(userID)
            .collection("notes")
            .doc(noteID)

        const noteDoc = await noteRef.get()

        if (!noteDoc.exists) {
            return NextResponse.json({ 
                success: false, 
                message: "Note already deleted or not found" 
            })
        }

        const batch = db.batch()
        batch.delete(noteRef)

        const foldersSnapshot = await db
            .collection("users")
            .doc(userID)
            .collection("folders")
            .get()
        
        for (const folderDoc of foldersSnapshot.docs) {
            const noteRefInFolder = folderDoc.ref.collection("notes").doc(noteID)
            const noteInFolderDoc = await noteRefInFolder.get()

            if (noteInFolderDoc.exists) {
                batch.delete(noteRefInFolder)
            }
        }

        await batch.commit()

        revalidateTag("notes")

        return NextResponse.json({ 
            success: true, 
            message: "Note deleted successfully!" 
        })

    } catch (err) {
        console.error("Error clearing notes:", err)
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error" 
        })
    }
}
