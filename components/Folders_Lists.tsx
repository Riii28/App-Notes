'use client'

import Link from "next/link"

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default function FoldersLists({ folders }: { folders: Folder[] }) {
    return (
        <div className="flex flex-col gap-y-4">
            {folders.length > 0 ? (
                folders.map((folder) => (
                    <Link
                        href={`/folder/${folder.id}`}
                        key={folder.id} 
                        className="flex justify-between p-3 bg-400 dark:bg-dark-200 transition-colors duration-200 rounded-md"
                    >
                        <h1>{folder.name}</h1>
                        <p>{folder.createdAt.slice(0,10)}</p>
                    </Link>
                ))
            ) : (
                <h1 className="text-xl text-dark-300 font-bold">No folders</h1>
            )}
        </div>
    )
}

