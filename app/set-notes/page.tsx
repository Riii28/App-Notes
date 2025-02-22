'use client'

import NotesForm from "@/components/Notes_Form";
import Loading from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SetNotes() {
    const searchParams = useSearchParams()
    const noteID: any = searchParams.get('id')
    
    return (
        <Suspense fallback={<Loading addStyle={"fill-100 h-8 w-8"} />}>
            <NotesForm noteID={noteID}/>
        </Suspense>
    )
}
