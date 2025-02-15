import Link from "next/link";
import { ReactNode } from "react";

export default function FoldersDetailsLayout({ children }: { children: ReactNode }) {
    return (
        <section className="mx-4 mt-24">
            <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 text-xl">
                <Link href={'/folders'}>Return</Link>
                <h1>Folder detail</h1>
            </header>
            <main>
                { children }
            </main>
        </section>
    )
}