import { cookies } from "next/headers"

export async function getDetailFolder(id: string) {
    try {
        const cookieStore = cookies()
        const cookieHeader = (await cookieStore).toString()

        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/folders/details?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
