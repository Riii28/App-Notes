import NotesForm from "@/components/Notes_Form";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getNotes } from "@/helpers/get_notes";

export default async function SetNotes({ searchParams }: { searchParams: Promise<{ id?: string, folderId?: string }> }) {
    const session = await getServerSession(authOptions)
    const userID = session?.user.id || null
    const folderID = (await searchParams).folderId || null
    const noteID = (await searchParams).id || null
    const note = await getNotes(noteID)

    if (noteID && !note) {
        notFound()
    }
    
    return (
        <main className="mt-20 flex flex-col gap-y-3">
            <NotesForm note={note} noteID={noteID} userID={userID} folderID={folderID}/>
        </main>
    )
}
