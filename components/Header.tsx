'use client'

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Loading from "./Spinner";
import UserDropdown from "./User_Dropdown";
import { useAppState } from "@/store/app_state";
import Link from "next/link";

export default function Header({ title }: { title: ReactNode }) {
    const { data: session, status } = useSession()
    const { setSettingState } = useAppState()    

    return (
        <header className="fixed top-0 left-0 w-full h-36 flex justify-between p-4 bg-light-200 dark:bg-dark-100 rounded-b-xl">
            <div>
                <h1 className="text-4xl font-bold">{ title }</h1>
                <h3 className="text-sm text-dark-300 mt-4">Organize your day</h3>
            </div>
            <div className="flex flex-col">
                <div className="flex-1">
                        <img
                            className="mx-auto aspect-square object-cover rounded-[50%] bg-300 p-2"
                            src='/profile-default.png'
                            width={55}
                            height={55}
                            alt="profile"
                        />
                </div>
                <div className="flex gap-x-5 justify-end">
                    <FontAwesomeIcon
                        cursor='pointer'
                        icon={faCheckSquare}
                        size="lg"
                    />

                    <Link href={'/search'}>
                        <FontAwesomeIcon 
                            cursor='pointer'
                            icon={faSearch} 
                            size="lg"
                        />
                    </Link>

                    <button>
                        <FontAwesomeIcon
                            cursor='pointer'
                            icon={faGear} 
                            onClick={setSettingState}
                            size="lg"
                        />
                    </button>
                    <UserDropdown />
                </div>
            </div>
        </header>
    )
}