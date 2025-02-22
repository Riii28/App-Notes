import NotesForm from "@/components/Notes_Form";
import { notFound } from "next/navigation";
import { getNotes } from "@/app/helpers/get_notes";

export default async function SetNotes({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const noteID = (await searchParams).id || null
    const note = await getNotes(noteID)

    if (noteID && !note) {
        notFound()
    }
    
    return (
        <NotesForm note={note} noteID={noteID}/>
    )
}
