'use client'

import { useAppState } from "@/store/app_state"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { variants } from "@/utils/transitions"

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default function FoldersLists({ folders, handleMoveFolder }: { folders: Folder[], handleMoveFolder?: Function }) {
    const { deleteFolderState, setDeleteFolderState} = useAppState()
    const { push, refresh } = useRouter()

    async function handleDeleteFolder(id: string) {
        try {
            const response: Response = await fetch(`/api/folders?folderId=${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                return
            }

            const result = await response.json()

            if (!result.success) {
                return
            }

            toast.success(result.message)
            setDeleteFolderState()
            refresh()
        } catch (err) {

        }
    }
    
    return (
        <div className="flex flex-col gap-y-4">
            {folders?.length > 0 ? (
                folders.map((folder: Folder) => (
                    <motion.div
                        initial="initial" 
                        animate="animate"
                        variants={variants.fadeIn}
                        key={folder.id} 
                        className="flex"
                    >
                        <div
                            onClick={() => handleMoveFolder ? handleMoveFolder(folder.id) : push(`/folders-details/${folder.id}`)}
                            className="flex w-full justify-between p-3 overflow-hidden bg-400 dark:bg-dark-200 transition-colors duration-200 rounded-md cursor-pointer active:scale-95"
                        >
                            <h1 className="truncate max-w-48">{folder.name}</h1>
                            <p className="text-sm text-dark-300">{folder.createdAt.slice(0,10)}</p>
                        </div>
                        {deleteFolderState && (
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={variants.showFromRight}
                                className="flex justify-center items-center w-14"
                            >
                                <FontAwesomeIcon
                                    onClick={() => handleDeleteFolder(folder.id)}
                                    icon={faTrash} 
                                    size="lg"
                                    cursor='pointer'
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ))
            ) : (
                <h1 className="text-xl text-dark-300 font-bold">No folders</h1>
            )}
        </div>
    )
}