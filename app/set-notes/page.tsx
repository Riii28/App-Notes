import NotesForm from "@/components/Notes_Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../(api)/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";

interface Note {
    title: string
    content: string
    createdAt: string
}

async function getNote(noteID: string | null): Promise<Note | null> {
    const cookieStore =  cookies()
    if (!noteID) return null
    
    const response = await fetch(`http://localhost:3000/api/notes?id=${noteID}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Cookie: (await cookieStore).toString()
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
    const noteID = (await searchParams).id || null
    // const session = await getServerSession(authOptions)
    const note = await getNote(noteID)

    if (!note) {
        
    }
    
    return (
        <section className="mx-4">
            <header className="fixed top-0 left-0 w-full h-16 px-4 flex justify-between items-center bg-400">
                <Link href={'/home'} className="flex gap-x-2">
                    <FontAwesomeIcon size="lg" icon={faChevronLeft} />
                    <h1>Return</h1>
                </Link>
                <h1>{noteID ? 'Edit Notes' : 'Create Notes'}</h1>
            </header>

            <main className="mx-4 mt-24 flex flex-col gap-y-3">
                <NotesForm  note={note} noteID={noteID}/>
            </main>
        </section>
    )
}



// 'use client'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
// import dayjs from "dayjs"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import Link from "next/link"
// import Loading from "@/components/Spinner"
// import toast, { Toaster } from "react-hot-toast"
// import { useSession } from "next-auth/react"

// interface NoteState {
//     title: string
//     content: string
//     createdAt: string
// }

// export default function SetNotes() {
//     const { data: session } = useSession()
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const [loading, setLoading] = useState(false)
//     const noteID = searchParams.get('id')
//     const [note, setNote] = useState<NoteState>({
//         title: '',
//         content: '',
//         createdAt: ''
//     })

//     const handleSave = async () => {
//         if (!note.title.trim() || !note.content.trim()) {
//             toast.error('Notes cant be empty')
//             return
//         }

//         try {
//             const response = await fetch(`/api/notes${noteID ? `?id=${noteID}` : ''}`, {
//                 method: noteID ? 'PUT' : 'POST',
//                 headers: { 'Content-Type': 'Application/json' },
//                 body: JSON.stringify({
//                     title: note.title,
//                     content: note.content,
//                     createdAt: dayjs().format('dddd, MMMM D [at] HH:mm'),
//                     userId: session?.user.id
//                 })
//             })

//             if (!response.ok) {
//                 toast.error('Failed to save note')
//                 return
//             }
            
//             const result = await response.json()
//             if (!result.success) {
//                 toast.error(result.message)
//                 return
//             }
            
//             router.push('/home')
//             toast.success(result.message)
//         } catch (err) {
//             return
//         }
//     }

//     useEffect(() => {
//         if (noteID) {
//             async function getNotes() {
//                 setLoading(true)
//                 try {
//                     const response = await fetch(`/api/notes?id=${noteID}`, {
//                         method: 'GET',
//                         headers: { 'Content-Type': 'Application/json' }
//                     })

//                     if (!response.ok) {
//                         return 
//                     }

//                     const result = await response.json()
//                     if (!result.success) {
//                         router.push('/set-notes')
//                         return 
//                     }

//                     if (result.data?.length > 1) {
//                         return
//                     }

//                     setNote({
//                         title: result.data?.title,
//                         content: result.data?.content,
//                         createdAt: result.data?.createdAt
//                     })

//                 } catch (err) {
//                     return
//                 } finally {
//                     setLoading(false)
//                 }
//             }
//             getNotes()
//         }
//     }, [noteID])

//     return (
//         <section className="mx-4">
//             <Toaster position="top-center" reverseOrder={true}/>
//             <header className="fixed top-0 left-0 w-full h-16 px-4 flex justify-between items-center bg-400">
//                 <Link href={'/home'} className="flex gap-x-2">
//                     <FontAwesomeIcon size="lg" icon={faChevronLeft} />
//                     <h1>Return</h1>
//                 </Link>
//                 <h1>{noteID ? 'Edit Notes' : 'Create Notes'}</h1>
//             </header>
//             {loading ? (
//                 <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                     <div className="flex items-center gap-x-4">
//                         <span className="text-xl">Loading</span>
//                         <Loading addStyle={'fill-200 h-10 w-10'} />
//                     </div>
//                 </div>
//             ) : (
//                 <main className="mx-4 mt-24 flex flex-col gap-y-3">
//                     <input
//                         value={note.title}
//                         onChange={(e) => setNote({ ...note, title: e.target.value })}
//                         type="text"
//                         name="title"
//                         className="w-full bg-transparent outline-none text-xl"
//                         placeholder="Title"
//                     />
//                     <p className="text-sm text-dark-300">{noteID ? note.createdAt : dayjs().format('dddd, MMMM D [at] HH:mm')} | {note.content.length}</p>
//                     <textarea
//                         value={note.content}
//                         onChange={(e) => setNote({ ...note, content: e.target.value })}
//                         name="content"
//                         placeholder="Type your note" 
//                         className="resize-none bg-transparent w-full h-[36rem] outline-none text-lg sm:h-[30rem]"
//                     />
//                     <button
//                         onClick={handleSave}
//                     >   
//                         <FontAwesomeIcon size="xl" icon={faCheck} />
//                     </button>
//                 </main>
//             )}
//         </section>
//     )
// }