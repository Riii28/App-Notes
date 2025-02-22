"use client"

import NotesForm from "@/components/Notes_Form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SetNotes() {
    const searchParams = useSearchParams()
    const noteID: any = searchParams.get('id')
    
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <NotesForm noteID={noteID}/>
        </Suspense>
    )
}
