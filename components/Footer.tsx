'use client'

import { useAppState } from "@/store/app_state";
import { faFolderBlank, faHome, faFolderOpen, faHomeUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import FabButton from "./Fab_Button";

export default function Footer() {
    const pathname = usePathname()
    const { activePage, setActivePage } = useAppState()

    useEffect(() => {
        setActivePage(pathname)
    }, [pathname, setActivePage])

    const isActive = (path: string) => activePage === path

    return (
        <>
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 bg-light-200 rounded-t-xl">
                <Link
                    className={`${isActive('/home') ? 'text-200' : 'text-dark-200'} flex flex-col items-center transition-colors duration-200`}
                    href={'/home'}
                >
                    <FontAwesomeIcon 
                        icon={isActive('/home') ? faHomeUser : faHome} 
                        size="lg"
                        cursor='pointer'
                    />
                    <h1>Home</h1>
                </Link>
                <Link 
                    className={`${isActive('/folder') ? 'text-200' : 'text-dark-200'} flex flex-col items-center transition-colors duration-200`}
                    href={'/folder'}
                >
                    <FontAwesomeIcon 
                        icon={isActive('/folder') ? faFolderOpen : faFolderBlank} 
                        size="lg"
                        cursor='pointer'
                    />
                    <h1>Folder</h1>
                </Link>
            </nav>
            <FabButton />
        </>
    )
}