'use client'

import { useAppState } from "@/store/app_state"
import FoldersLists from "./Folders_Lists"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast"

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default function FoldersDropdown({ folders }: { folders: Folder[] }) {
    const { selectedNote, setSelectedNote, setMoveToState } = useAppState()

    async function handleMoveFolder(id: string) {
        try {
            const response: Response = await fetch('/api/folders/add-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    noteID: selectedNote, 
                    folderID: id 
                })
            })

            if (!response.ok) {
                toast.error('Check your connection')
                return
            }

            const result = await response.json()

            if (!result.success) {
                toast.error(result.message)
                return
            }

            setSelectedNote(null)
            setMoveToState()
        } catch (err) {
            console.error("Error handle move folder:", err)
        }
    }

    return (
        selectedNote && (
            <div className="fixed w-full h-full z-50 bg-transparent">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-8 bg-white dark:bg-gray-800 transition-colors duration-200 w-80 p-4 rounded-md shadow-md">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl">Move to folder</h1>
                        <FontAwesomeIcon 
                            icon={faX} 
                            size="lg"
                            cursor='pointer'
                            onClick={() => {
                                setSelectedNote(null)
                                setMoveToState()
                            }}
                        />
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                        <FoldersLists folders={folders} handleMoveFolder={handleMoveFolder} />
                    </div>
                </div>
            </div>
        )
    )
}