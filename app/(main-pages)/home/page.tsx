import NotesLists from "@/components/Notes_Lists";
import { cookies } from "next/headers";

interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}

async function getNotes() {
    const cookieStore = cookies()

    try {
        const response = await fetch(`http://localhost:3000/api/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Cookie': (await cookieStore).toString()
            },
            cache: 'force-cache',
        })

        if (!response.ok) {
            return null
        }

        const result = await response.json();

        if (!result.success) {
            return null
        }

        return result.data
    } catch (err) {
        console.error("Error fetching notes:", err)
        return
    }
}

export default async function Home() {
    const notes: Note[] = await getNotes()

    return (
        <main className="flex flex-col gap-y-4">
            <NotesLists notes={notes} />
        </main>
    );
}
