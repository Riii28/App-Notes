import { cookies } from "next/headers";

export async function getNotes(noteID?: string | null) {
    const cookieStore = cookies()
    const cookieHeader = (await cookieStore).toString()
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes${noteID ? `?id=${noteID}` : ''}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Cookie': cookieHeader
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
    } catch (err) {
        console.error(err)
    }
}
