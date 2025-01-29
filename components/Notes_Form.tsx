'use client'

import { useState } from "react"
import dayjs from "dayjs"
import { Toaster } from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Note {
    title: string
    content: string
    createdAt: string
}

export default function NotesForm({ note, noteID }: { note: Note | null , noteID: string | null }) {
    const router = useRouter()
    const [state, setState] = useState<Note>({
        title: note?.title || '',
        content: note?.content || '',
        createdAt: note?.createdAt || dayjs().format('dddd, MMMM D [at] HH:mm')
    })

    async function handleSave() {
        if (!state.title.trim() || !state.content.trim()) {
            return
        }

        try {
            const response = await fetch(`/api/notes${noteID ? `?id=${noteID}` : ''}`, {
                method: noteID ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: state.title,
                    content: state.content,
                    createdAt: state.createdAt,
                })
            })

            if (!response.ok) {
                return
            }

            const result = await response.json()

            if (!result.success) {
                return
            }

            router.push('/home')
        } catch (err) {
            return
        }
    }
    
    return (
        <>
            <input
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                type="text"
                name="title"
                className="w-full bg-transparent outline-none text-xl"
                placeholder="Title"
            />
            <p className="text-sm text-dark-300">{noteID ? state.createdAt : dayjs().format('dddd, MMMM D [at] HH:mm')} | {state.content.length}</p>
            <textarea
                value={state.content}
                onChange={(e) => setState({ ...state, content: e.target.value })}
                name="content"
                placeholder="Type your note" 
                className="resize-none bg-transparent w-full h-[36rem] outline-none text-lg sm:h-[30rem]"
            />
            <button
                onClick={handleSave}
            >   
             save
                <FontAwesomeIcon size="xl" icon={faCheck} />
            </button>            
        </>
    )
}