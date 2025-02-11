'use client'

import { ReactNode } from "react";
import BtnGroupHome from "./Button_Group_Home";
import BtnGroupFolder from "./Button_Group_Folders";
import UserDropdown from "./User_Dropdown";
import { usePathname } from "next/navigation";

export default function Header({ title }: { title: ReactNode }) {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 w-full h-36 flex justify-between p-4 bg-light-200 dark:bg-dark-100 transition-colors duration-200 rounded-b-xl">
            <div>
                <h1 className="text-4xl font-bold">{ title }</h1>
                <h3 className="text-sm text-dark-300 mt-4 dark:text-light-200">Organize your day</h3>
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
                {pathname === '/home' ? <BtnGroupHome /> : <BtnGroupFolder />}
                <UserDropdown />
            </div>
        </header>
    )
}