'use client'

import { useTheme } from "@/store/theme";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const { syncTheme, theme } = useTheme()

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [theme])

    return (
        <>
            { children }
        </>
    )
} 