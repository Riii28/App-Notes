'use client'

import NotesForm from "@/components/Notes_Form";
import { useSearchParams } from "next/navigation";

export default function SetNotes() {
    const searchParams = useSearchParams()
    const noteID: any = searchParams.get('id')
    
    return (
        <NotesForm noteID={noteID}/>
    )
}
