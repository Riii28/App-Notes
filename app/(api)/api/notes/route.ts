import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
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

    const userID = token.id

    if (!userID) {
        return NextResponse.json({
            success: false,
            message: 'User ID not found'
        })
    }

    try {
        const noteRef = collection(db, `users/${userID}/notes`)
        await addDoc(noteRef, {
            title,
            content,
            createdAt
        })

        return NextResponse.json({
            success: true,
            message: 'Success to add note'
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Failed to add note'
        })
    }
}

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
    const searchParams = request.nextUrl.searchParams
    const noteID = searchParams.get('id')

    if (!token) {
        return NextResponse.json({
            success: false,
            message: 'Unauthorized'
        })
    }

    const userID = token.id

    if (!userID) {
        return NextResponse.json({
            success: false,
            message: 'User ID not found'
        })
    }

    if (noteID) {
        try {
            const noteRef = doc(db, `users/${userID}/notes`, noteID)
            const noteDoc = await getDoc(noteRef)
    
            if (!noteDoc.exists()) {
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
        } catch (err) {
            return NextResponse.json({
                success: false,
                message: 'Failed to get data'
            })
        }
    }

    try {
        const notesCollection = collection(db, `users/${userID}/notes`)
        const notesQuery = query(notesCollection)
        const notesSnapshot = await getDocs(notesQuery)
    
        const notes = notesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    
        return NextResponse.json({
            success: true,
            message: 'Success to fetch all data',
            data: notes
        })   
    } catch {
        return NextResponse.json({
            success: false,
            message: 'Failed to get all data'
        })
    }
}

export async function PUT(request: NextRequest) {
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

    const userID = token.id

    if (!userID) {
        return NextResponse.json({
            success: false,
            message: 'User ID not found'
        })
    }

    if (!noteID) {
        return NextResponse.json({
            success: false,
            message: 'Note id not found'
        })
    }

    try {
        const noteRef = doc(db, `users/${userID}/notes`, noteID)
        const noteDoc = await getDoc(noteRef)
    
        if (!noteDoc.exists()) {
            return NextResponse.json({
                success: false,
                message: 'Note not found'
            })
        }

        await updateDoc(noteRef, {
            title,
            content,
            createdAt
        })

        return NextResponse.json({
            success: true,
            message: 'Success to update note'
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Failed to update note'
        })
    }
}