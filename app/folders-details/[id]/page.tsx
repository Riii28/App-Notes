import NotesLists from "@/components/Notes_Lists"
import { getDetailFolder } from "@/app/helpers/get_details_folders"

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

export default async function FolderDetails({ params }: { params: Promise<{ id: string }>}) {
    const id = (await params).id
    const notes: Note[] = await getDetailFolder(id)
    
    return (
        <NotesLists notes={notes}/>
    )
}