import '@/styles/App.css';
import '@/styles/component.css'
import '@/fontawesome.config'
import { ReactNode } from "react";
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next';
import ThemeProvider from '@/components/Theme_Provider';

const poppins = Poppins({
    weight: ['100', '200', '300', '400'],
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'Notes'
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className={`${poppins.className}`}>
                <ThemeProvider>
                    { children }
                </ThemeProvider>
            </body>
        </html>
    )
}
