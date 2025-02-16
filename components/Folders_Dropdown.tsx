'use client'

import { useAppState } from "@/store/app_state"
import FoldersLists from "./Folders_Lists"

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
                return
            }

            const result = await response.json()

            if (!result.success) {
                return
            }

            setSelectedNote(null)
            setMoveToState()
        } catch (err) {

        }
    }

    return (
        selectedNote && (
            <div className="fixed w-full h-full z-50 bg-transparent">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-8 bg-white dark:bg-gray-800 transition-colors duration-200 w-80 p-4 rounded-md shadow-md">
                    <h1 className="text-xl">Move to folder</h1>
                    <div className="max-h-52 overflow-y-auto">
                        <FoldersLists folders={folders} handleMoveFolder={handleMoveFolder} />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            onClick={() => {
                                setSelectedNote(null)
                                setMoveToState()
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}