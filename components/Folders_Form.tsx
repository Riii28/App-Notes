'use client'

import { useAppState } from "@/store/app_state"
import { variants } from "@/utils/transitions"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function FoldersForm() {
    const { refresh } = useRouter()
    const [state, setState] = useState<string>('')
    const { folderFormState, setFolderFormState } = useAppState()

    async function handleAddFolder() {
        try {
            const response = await fetch('/api/folders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder: state })
            })

            if (!response.ok) {
                console.log(response)
                return
            }

            const result = await response.json()

            if (!result.success) {
                toast.error(result.message)
                return
            }

            setState('')
            setFolderFormState()
            refresh()
            toast.success('Folder added!')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        folderFormState && (
            <div className="fixed w-full h-full z-50 bg-transparent">
                <motion.div
                    initial='initial' 
                    animate='animate'
                    variants={variants.fadeIn}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-8 bg-white dark:bg-gray-800 transition-colors duration-200 w-80 p-4 rounded-md shadow-md"
                >
                    <h1 className="text-xl font-semibold">New folder</h1>
                    <div>
                        <input
                            onChange={(e) => setState(e.target.value)} 
                            value={state}
                            type="text"
                            placeholder="Folder"
                            maxLength={50}
                            className="outline-none bg-light-200 w-full p-3 rounded-md dark:bg-dark-100"
                        />
                    </div>
                    <div className="flex justify-end gap-x-6 text-dark-300 dark:text-light-100">
                        <button
                            onClick={setFolderFormState}
                            className="px-4 py-1 bg-400 rounded-md active:scale-95 dark:bg-dark-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddFolder}
                            className="px-4 py-1 bg-100 rounded-md active:scale-95"
                        >
                            Add
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    )
}