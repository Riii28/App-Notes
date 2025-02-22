'use client'

import Confirm from "@/components/Confirm";
import FoldersForm from "@/components/Folders_Form";
import FoldersLists from "@/components/Folders_Lists";
import { useState, useEffect } from "react";

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default function Folder() {
    const [folders, setFolders] = useState<Folder[]>([])

        useEffect(() => {
            async function getFolders() {
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
            }
            getFolders()
        }, [])
    
    return (
        <main className="flex flex-col gap-y-4">
            <FoldersForm />
            <Confirm title="Delete all folders?" func="CLEAR_FOLDERS" />
            <FoldersLists folders={folders} />
        </main>
    )
}