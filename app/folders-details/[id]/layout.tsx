import { ReactNode } from "react";

export default function FoldersDetailsLayout({ children }: { children: ReactNode }) {
    return (
        <section className="mx-4">
            <header className="fixed top-0 left-0 w-full">

            </header>
            <main>
                { children }
            </main>
        </section>
    )
}