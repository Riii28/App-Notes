import { ReactNode } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


export default function SetNotesLayout({ children }: { children: ReactNode }) {
    return (
        <section className="mx-4">
            <header className="fixed top-0 left-0 w-full h-16 px-4 flex justify-between items-center">
                <Link href={'/home'} className="flex gap-x-4">
                    <FontAwesomeIcon size="xl" icon={faChevronLeft} />
                    <h1 className="text-xl">Return</h1>
                </Link>
            </header>
            { children }
        </section>
    )
}