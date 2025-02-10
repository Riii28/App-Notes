import NotesLists from "@/components/Notes_Lists";
import { getNotes } from "@/app/helpers/get_notes";

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

export default async function Home() {
    const notes: Note[] = await getNotes()

    return (
        <main className="flex flex-col gap-y-4">
            <NotesLists notes={notes} />
        </main>
    );
}
