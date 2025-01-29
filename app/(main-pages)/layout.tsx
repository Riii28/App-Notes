'use client'

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function PageLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    return (
        <SessionProvider>
            <section className="mx-4 mt-40 mb-24">
                <Header title={pathname === '/home' ? 'Notes' : 'Folders'}/>
                    { children }
                <Footer />
            </section>
        </SessionProvider>
    )
} 