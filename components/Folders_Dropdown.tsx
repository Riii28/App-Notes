'use client'

import { useAppState } from "@/store/app_state"
import { useEffect, useState } from "react"
import FoldersLists from "./Folders_Lists"

interface Folder {
    name: string
}

export default function FoldersDropdown() {
    const { selectedNote, setSelectedNote } = useAppState()
    const [folders, setFolders] = useState([])

    useEffect(() => {
        async function getFolders() {
            try {
                const response: Response = await fetch('/api/folders', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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

            }
        }
        getFolders()
    }, [])

    const handleMoveFolder = async (id: string) => {
        try {
            const response: Response = await fetch('/api/folders/add-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ noteID: selectedNote, folderID: id })
            })

            if (!response.ok) {
                return
            }

            const result = await response.json()

            if (!result.success) {
                return
            }

            setSelectedNote(null)
        } catch (err) {

        }
    }
    
    return (
        selectedNote && (
            <div className="fixed w-full h-full z-50 bg-transparent">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-8 bg-white dark:bg-gray-800 transition-colors duration-200 w-80 p-4 rounded-md shadow-md">
                    <FoldersLists folders={folders} handleMoveFolder={handleMoveFolder} />
                </div>
            </div>
        )
    )
}