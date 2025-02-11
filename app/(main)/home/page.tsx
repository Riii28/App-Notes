import NotesLists from "@/components/Notes_Lists";
import { getNotes } from "@/app/helpers/get_notes";
import FoldersDropdown from "@/components/Folders_Dropdown";

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
            <FoldersDropdown />
            <NotesLists notes={notes} />
        </main>
    );
}
