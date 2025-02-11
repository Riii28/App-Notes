'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default function FoldersLists({ folders, handleMoveFolder }: { folders: Folder[], handleMoveFolder?: Function }) {
    const { push } = useRouter()
    return (
        <div className="flex flex-col gap-y-4">
            {folders.length > 0 ? (
                folders.map((folder: Folder) => (
                    <div
                        onClick={() => handleMoveFolder ? handleMoveFolder(folder.id) : push(`/folders-details/${folder.id}`)}
                        key={folder.id} 
                        className="flex justify-between p-3 overflow-hidden bg-400 dark:bg-dark-200 transition-colors duration-200 rounded-md"
                    >
                        <h1 className="truncate max-w-48">{folder.name}</h1>
                        <p className="text-sm text-dark-300">{folder.createdAt.slice(0,10)}</p>
                    </div>
                ))
            ) : (
                <h1 className="text-xl text-dark-300 font-bold">No folders</h1>
            )}
        </div>
    )
}