'use client'

import { useAppState } from "@/store/app_state"
import { signOut, useSession } from "next-auth/react"

export default function UserDropdown() {
    const { data: session } = useSession()
    const { settingState } = useAppState()
    
    return (
        <div className={`${settingState ? 'fixed' : 'hidden'} top-36 right-4 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}>
            <div className="px-4 py-3 truncate">
                <h1 className="truncate">{session?.user.fullname}</h1>
                <p className="truncate text-sm">{session?.user.email}</p>
                <p className="truncate text-sm mt-2 ">{session?.user.role}</p>
            </div>
            <div className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </div>
                <div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </div>
                <div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </div>
            </div>
            <div className="py-1">
                <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => signOut()}
                >
                    Sign out
                </a>
            </div>
        </div>
    )
}