import NotesLists from "@/components/Notes_Lists"
import { cookies } from "next/headers"

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

async function getDetailFolder(id: string) {
    try {
        const cookieStore = cookies()

        const response: Response = await fetch(`http://localhost:3000/api/folders/details?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': (await cookieStore).toString()
            }
        })

        if (!response.ok) {
            return null
        }

        const result = await response.json()

        if (!result.success) {
            return null
        }

        return result.data
    } catch (err) {
        console.error('Errror di \n', err)
    }
}

export default async function FolderDetails({ params }: { params: Promise<{ id: string }>}) {
    const id = (await params).id
    const notes: Note[] = await getDetailFolder(id)

    return (
        <section>
            <NotesLists notes={notes} folderID={id}/>
        </section>
    )
}