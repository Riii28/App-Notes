import { cookies } from "next/headers";
import Link from "next/link";

async function getNotes() {
    const cookieStore = cookies()

    try {
        const response = await fetch(`http://localhost:3000/api/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: (await cookieStore).toString()
            },
            cache: 'no-store',
        })

        if (!response.ok) {
            return
        }

        const result = await response.json();

        if (!result.success) {
            return
        }

        return result.data
    } catch (err) {
        console.error("Error fetching notes:", err)
        return
    }
}

export default async function Home() {
    const notes = await getNotes()

    return (
        <main className="flex flex-col gap-y-4">
            {notes.map((note: any) => (
                <Link 
                    key={note.id} 
                    href={`/set-notes?id=${note.id}`}
                    className="bg-400"
                >
                    <h1>{note.title}</h1>
                    <p>{note.createdAt}</p>
                    <p>{note.content}</p>
                </Link>
            ))}
        </main>
    );
}
