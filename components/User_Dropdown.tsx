'use client'

import { useAppState } from "@/store/app_state"
import { signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { variants } from "@/utils/transitions"
import { useTheme } from "@/store/theme"
import { usePathname } from "next/navigation"

export default function UserDropdown() {
    const { data: session } = useSession()
    const { settingState, setMoveToState, setConfirmState } = useAppState()
    const { toggleTheme, theme } = useTheme()
    const pathname = usePathname()

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/auth/sign-in' })
        localStorage.removeItem('theme-storage')
    }
    
    return (
        settingState && (
            <motion.div
                initial='initial'
                animate='animate'
                variants={variants.fadeIn}
                className='fixed top-36 right-4 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-800 dark:divide-gray-600'
            >
                <div className="px-4 py-3 truncate">
                    <h1 className="truncate">{session?.user.fullname}</h1>
                    <p className="truncate text-sm">{session?.user.email}</p>
                    <p className="truncate text-sm mt-2 ">{session?.user.role}</p>
                </div>
                <div className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    {session?.user.role === 'admin' ? (
                        <p 
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Dashboard
                        </p>
                    ) : null}
                    <p  
                        onClick={toggleTheme}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        {theme === 'light' ? 'Light mode' : 'Dark mode'}
                    </p>
                    {pathname === '/home' ? (
                        <p  
                            onClick={setMoveToState}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Move to folder
                        </p>
                    ) : null}
                    <p
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={setConfirmState}
                    >
                        {pathname === '/home' ? 'Clear notes' : 'Clear folders'}
                    </p>
                </div>
                <div className="py-1">
                    <p
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={handleLogout}
                    >
                        Sign out
                    </p>
                </div>
            </motion.div>
        )
    )
}