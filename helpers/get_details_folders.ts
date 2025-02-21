import { cookies } from "next/headers"

export async function getDetailFolder(id: string) {
    try {
        const cookieStore = cookies()

        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/folders/details?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': (await cookieStore).toString()
            },
            cache: 'force-cache',
            next: {
                tags: ['folders-details']
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
