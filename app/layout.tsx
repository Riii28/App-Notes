import type { Metadata } from "next";
import '@/styles/App.css';
import { ReactNode } from "react";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    weight: ['100', '200', '300', '400'],
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'App Notes',
    description: 'Notes that help your day'
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className={poppins.className}>
                { children }
            </body>
        </html>
    )
}
