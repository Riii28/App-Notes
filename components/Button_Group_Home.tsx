'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faGear } from "@fortawesome/free-solid-svg-icons";
import { useAppState } from "@/store/app_state";


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