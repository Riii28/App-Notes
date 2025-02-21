import { cookies } from "next/headers"

export async function getFolders() {
    try {
        const cookieStore = cookies()

        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/folders`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': (await cookieStore).toString()
            },
            cache: 'force-cache',
            next: {
                tags: ['folders']
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
        console.error(err)
    }
}
