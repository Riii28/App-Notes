'use client'

import { useAppState } from "@/store/app_state"
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { variants } from "@/utils/transitions"

interface Notes {
    id: string
    title: string
    content: string
    createdAt: string
}

export default function NotesLists({ notes }: { notes: Notes[] }) {    
    const router = useRouter()
    const { selectState, moveToState, setSelectedNote, setSelectState } = useAppState()

    async function handleDeleteNotes(noteID: string) {
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

            toast.success(result.message)
            setSelectState()
            router.refresh()
        } catch (err) {
            console.error(err)
            toast.error('Check your connection and try again')
            return
        }
    }

    return (
        <div className="flex flex-col gap-y-4">
            {notes && notes.length > 0 ? (
                notes.map((note: Notes) => (
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={variants.fadeIn}
                        key={note.id} 
                        className="flex "
                    >
                        {moveToState && (
                            <motion.div
                                initial='initial'
                                animate='animate'
                                variants={variants.showFromLeft}
                                className="flex w-14 justify-center items-center"
                            >
                               <FontAwesomeIcon 
                                    onClick={() => setSelectedNote(note.id)}
                                    icon={faCheck}
                                    cursor='pointer'
                                    size="lg"
                                    className="active:scale-95"
                               />
                            </motion.div>
                        )}
                        <Link 
                            href={`/set-notes?id=${note.id}`}
                            className="flex-1 bg-400 dark:bg-dark-200 transition-colors duration-200 p-2 rounded-md overflow-hidden active:scale-95"
                        >
                            <h1 className="truncate">{note.title}</h1>
                            <p className="text-sm text-dark-300">{note.createdAt}</p>
                            <p className="truncate max-w-96">{note.content}</p>
                        </Link>
                        {selectState && (
                            <motion.div
                                initial='initial'
                                animate='animate'
                                variants={variants.showFromRight}
                                className="flex w-14 justify-center items-center"
                            >
                                <FontAwesomeIcon
                                    onClick={() => handleDeleteNotes(note.id)}
                                    size="lg" 
                                    icon={faTrash} 
                                    cursor='pointer'
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ))                
            ) : (
                <h1 className="text-xl text-dark-300 font-bold">No notes</h1>
            )}
        </div>
    )
}