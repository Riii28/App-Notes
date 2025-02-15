'use client'

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/store/theme";

export default function PageLayout({ children }: { children: ReactNode }) {
    const { theme } = useTheme()

    const pathname = usePathname()
    return (
        <SessionProvider>
            <Toaster 
                position='top-center' 
                reverseOrder={false} 
                toastOptions={{
                    style: {
                        backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
                        color: theme === 'dark' ? '#f5f5f5' : '#333333'
                    }
                }}
            />
            <section className="mx-4 mt-40 mb-24 overflow-hidden">
                <Header title={pathname === '/home' ? 'Notes' : 'Folders'}/>
                    { children }
                <Footer />
            </section>
        </SessionProvider>
    )
}