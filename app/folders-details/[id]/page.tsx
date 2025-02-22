'use client'

import NotesLists from "@/components/Notes_Lists"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

export default function FolderDetails() {
    const params = useParams()
    const id: any = params.id
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(() => {
        async function getDetailsFolders(id: any) {
            try {
                const response = await fetch(`/api/folders/details?id=${id}`, {
                    method: 'GET',
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
        getDetailsFolders(id)
    }, [])

    return (
        <NotesLists notes={notes}/>
    )
}