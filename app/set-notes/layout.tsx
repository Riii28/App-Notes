import { ReactNode } from "react";
import Link from "next/link";

export default function SetNotesLayout({ children }: { children: ReactNode }) {
    return (
        <section className="mx-4">
            <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 text-xl">  
                <Link href={'/home'}>Return</Link>
                <h1>Edit notes</h1>
            </header>
            <main className="mt-20 flex flex-col gap-y-3">
                { children }
            </main>
        </section>
    )
}