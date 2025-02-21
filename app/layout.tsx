import '@/styles/App.css';
import '@/styles/component.css'
import '@/fontawesome.config'
import { ReactNode } from "react";
import { Poppins } from 'next/font/google'
import ThemeProvider from '@/components/Theme_Provider';
import { Metadata } from 'next';

const poppins = Poppins({
    weight: ['100', '200', '300', '400'],
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: "Catatan Online - Simpan Ide Kapan Saja",
    icons: {
        icon: "profile-default.png"
    },
    description: "Aplikasi catatan online yang memungkinkan Anda menyimpan, mengedit, dan mengelola catatan dengan mudah.",
    keywords: ["catatan", "note app", "simpanan ide", "nextjs"],
    authors: [{ name: "Ridho Irvan Nurhidayat", url: "https://yourwebsite.com" }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://default-site.com"),
    openGraph: {
        title: "Catatan Online - Simpan Ide Kapan Saja",
        description: "Aplikasi catatan online yang memungkinkan Anda menyimpan, mengedit, dan mengelola catatan dengan mudah.",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://default-site.com",
        siteName: "Catatan Online",
        images: [
            {
                url: "/profile-default.png",
                width: 1200,
                height: 630,
                alt: "Catatan Online",
            },
        ],
        type: "website",
    },
};

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
