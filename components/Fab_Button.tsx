'use client'

import { usePathname, useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function FabButton() {
    const pathname = usePathname()
    const { push } = useRouter()
    
    return (
        <div className="fixed right-10 bottom-32">
            <FontAwesomeIcon 
                icon={faPlus}
                size="2xl"
                className="p-2 bg-100 rounded-[50%]"
                onClick={() => pathname === '/home' ? push('/set-notes') : '/folder'}
            />
        </div>
    )
}