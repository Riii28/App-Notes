'use client'

import { useAppState } from "@/store/app_state"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface Notes {
    id: string
    title: string
    content: string
    createdAt: string
}

export default function NotesLists({ notes }: { notes: Notes[] }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { selectState } = useAppState()

    async function deleteNotes(noteID: string) {
        setLoading(true)
        try {
            const response = await fetch(`/api/notes?id=${noteID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                cache: 'force-cache'
            })

            if (!response.ok) {
                toast.error('Internal server error')
                return
            }

            const result = await response.json()

            if (!result.success) {
                toast.error(result.message)
                return
            }

            router.refresh()
            toast.success(result.message)
        } catch (err) {
            toast.error('Check your connection and try again')
            return
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-y-4">
            {notes.length > 0 ? (
                notes.map((note: Notes) => (
                    <div
                        key={note.id} 
                        className="flex"
                    >
                        <Link 
                            href={`/set-notes?id=${note.id}`}
                            className="flex-1 bg-400 p-2 rounded-md overflow-hidden"
                        >
                            <h1 className="truncate">{note.title}</h1>
                            <p className="text-sm text-dark-300">{note.createdAt}</p>
                            <p className="truncate max-w-96">{note.content}</p>
                        </Link>
                        <div
                            className={`${selectState ? 'flex' : 'hidden'} w-14 justify-center items-center`}
                        >
                            <button
                                onClick={() => deleteNotes(note.id)}
                            >
                                <FontAwesomeIcon 
                                    size="lg" 
                                    icon={faTrash} 
                                />
                            </button>
                        </div>
                    </div>
                ))                
            ) : (
                <h1 className="text-xl text-dark-300 font-bold">No notes</h1>
            )}
        </div>
    )
}