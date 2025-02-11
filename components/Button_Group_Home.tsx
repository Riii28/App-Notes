'use client'

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import UserDropdown from "./User_Dropdown";
import { useAppState } from "@/store/app_state";
import Link from "next/link";


export default function BtnGroupHome() {
    const { setSelectState, setSettingState } = useAppState()

    return (
        <div className="flex gap-x-5 justify-end">
            <button
                onClick={setSelectState}
            >
                <FontAwesomeIcon
                    cursor='pointer'
                    icon={faCheckSquare}
                    size="lg"
                />
            </button>

            <Link href={'/search'}>
                <FontAwesomeIcon 
                    cursor='pointer'
                    icon={faSearch} 
                    size="lg"
                />
            </Link>

            <button
                onClick={setSettingState}
            >
                <FontAwesomeIcon
                    cursor='pointer'
                    icon={faGear} 
                    size="lg"
                />
            </button>
        </div>
    )
}