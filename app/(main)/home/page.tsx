import NotesLists from "@/components/Notes_Lists";
import { getNotes } from "@/helpers/get_notes";
import FoldersDropdown from "@/components/Folders_Dropdown";
import { getFolders } from "@/helpers/get_folders";

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default async function Home() {
    const notes: Note[] = await getNotes()
    const folders: Folder[] = await getFolders()

    return (
        <main className="flex flex-col gap-y-4">
            <FoldersDropdown folders={folders} />
            <NotesLists notes={notes} />
        </main>
    )
}
