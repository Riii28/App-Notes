'use client'

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEdit, faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import UserDropdown from "./User_Dropdown";
import { useAppState } from "@/store/app_state";
import Link from "next/link";

export default function BtnGroupFolder() {
    const { setDeleteFolderState, setSettingState } = useAppState()

    return (
        <div className="flex gap-x-5 justify-end items-center">
            <button
                onClick={setDeleteFolderState}
            >
                <FontAwesomeIcon
                    cursor='pointer'
                    icon={faCheckSquare}
                    size="lg"
                />
            </button>
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