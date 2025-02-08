import NotesForm from "@/components/Notes_Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Note {
    title: string
    content: string
    createdAt: string
}

async function getNote(noteID: string | null): Promise<Note | null> {
    const cookieStore = cookies()
    if (!noteID) return null
    
    const response = await fetch(`http://localhost:3000/api/notes?id=${noteID}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Cookie': (await cookieStore).toString()
        },
        cache: 'no-store',
    })

    if (!response.ok) {
        return null
    }

    const result = await response.json()

    if (!result.success) {
        return null
    }

    return result.data
}

export default async function SetNotes({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const session = await getServerSession(authOptions)
    const userID = session?.user.id || null
    const noteID = (await searchParams).id || null
    const note = await getNote(noteID)

    if (noteID && !note) {
        notFound()
    }
    
    return (
        <section className="mx-4">
            <header className="fixed top-0 left-0 w-full h-16 px-4 flex justify-between items-center">
                <Link href={'/home'} className="flex gap-x-4">
                    <FontAwesomeIcon size="xl" icon={faChevronLeft} />
                    <h1 className="text-xl">Return</h1>
                </Link>
                <h1 className="text-lg">{noteID ? 'Edit Notes' : 'Create Notes'}</h1>
            </header>

            <main className="mt-20 flex flex-col gap-y-3">
                <NotesForm note={note} noteID={noteID} userID={userID}/>
            </main>
        </section>
    )
}
