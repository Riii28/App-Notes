'use client'

import NotesLists from "@/components/Notes_Lists";
import FoldersDropdown from "@/components/Folders_Dropdown";
import Confirm from "@/components/Confirm";
import { useEffect, useState } from "react";

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([])
    const [folders, setFolders] = useState<Folder[]>([])

    useEffect(() => {
        async function getNotes() {
            try {
                const response = await fetch('/api/notes', {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!response.ok) {
                    return
                }
                const result = await response.json()
                if (!result.success) {
                    return
                }
                setNotes(result.data)           
            } catch (err) {
                console.error(err)
            }
        }
        getNotes()
    }, [])

    useEffect(() => {
        async function getFolders() {
            try {
                const response = await fetch('/api/folders', {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!response.ok) {
                    return
                }
                const result = await response.json()
                if (!result.success) {
                    return
                }
                setFolders(result.data)
            } catch (err) {
                console.error(err)
            }
        }
        getFolders()
    }, [])

    return (
        <main className="flex flex-col gap-y-4">
            <FoldersDropdown folders={folders} />
            <Confirm title="Delete all notes?" func="CLEAR_NOTES"/>
            <NotesLists notes={notes} />
        </main>
    )
}
