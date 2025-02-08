'use client'

import { useAppState } from "@/store/app_state";
import { faFolderBlank, faHome, faFolderOpen, faHomeUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Footer() {
    const pathname = usePathname()
    const { push } = useRouter()
    const { setFolderFormState } = useAppState()

    return (
        <>
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20">
                <Link
                    className={`${pathname === '/home' ? 'text-100' : 'text-dark-200 dark:text-light-200'} flex flex-col items-center transition-colors duration-200 active:scale-95`}
                    href={'/home'}
                >
                    <FontAwesomeIcon 
                        icon={pathname === '/home' ? faHomeUser : faHome} 
                        size="lg"
                        cursor='pointer'
                    />
                    <h1>Home</h1>
                </Link>
                <Link
                    className={`${pathname === '/folder' ? 'text-100' : 'text-dark-200 dark:text-light-200'} flex flex-col items-center transition-colors duration-200 active:scale-95`}
                    href={'/folder'}
                >
                    <FontAwesomeIcon 
                        icon={pathname === '/folder' ? faFolderOpen : faFolderBlank} 
                        size="lg"
                        cursor='pointer'
                    />
                    <h1>Folder</h1>
                </Link>
                <button className="fixed right-10 bottom-32 cursor-pointer active:scale-95">
                    <FontAwesomeIcon 
                        icon={faPlus}
                        size="2xl"
                        className="p-2 bg-100 shadow-md rounded-[50%]"
                        onClick={() => pathname === '/home' ? push('/set-notes') : setFolderFormState() }
                    />
                </button>  
            </nav>
        </>
    )
}