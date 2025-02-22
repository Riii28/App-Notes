"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Spinner";
import { motion } from "framer-motion";
import { variants } from "@/utils/transitions";
import { useTheme } from "@/store/theme";

interface Note {
    title: string;
    content: string;
    createdAt: string;
}

export default function SetNotes() {
    const searchParams = useSearchParams()
    const noteID: string | null = searchParams.get('id')
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState<Note | null>(null);
    const router = useRouter();

    const [state, setState] = useState<Note>({
        title: "",
        content: "",
        createdAt: dayjs().format("dddd, MMMM D [at] HH:mm"),
    });

    // Fetch catatan jika ada noteID
    useEffect(() => {
        if (!noteID) return;

        async function getNote(id: string) {
            try {
                const response = await fetch(`/api/notes?id=${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) return;

                const result = await response.json();
                if (!result.success) return;

                setNote(result.data);
            } catch (err) {
                console.error(err);
            }
        }

        getNote(noteID);
    }, [noteID]);

    // Update state saat note berubah
    useEffect(() => {
        if (note) {
            setState({
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
            });
        }
    }, [note]);

    async function handleSave() {
        if (!state.title.trim() || !state.content.trim()) {
            toast.error("Notes cannot be empty");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/notes${noteID ? `?id=${noteID}` : ""}`, {
                method: noteID ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: state.title,
                    content: state.content,
                    createdAt: state.createdAt,
                }),
            });

            if (!response.ok) {
                toast.error("Internal server error");
                return;
            }

            const result = await response.json();
            if (!result.success) {
                toast.error(result.message);
                return;
            }

            router.push("/home");
        } catch (err) {
            console.error(err);
            toast.error("Check your connections");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div initial="initial" animate="animate" variants={variants.fadeIn}>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
                        color: theme === "dark" ? "#f5f5f5" : "#333333",
                    },
                }}
            />
            <input
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                type="text"
                name="title"
                className="w-full bg-transparent outline-none text-xl"
                placeholder="Title"
            />
            <p className="text-sm text-dark-300">
                {state.createdAt} | {state.content.length}
            </p>
            <textarea
                value={state.content}
                onChange={(e) => setState({ ...state, content: e.target.value })}
                name="content"
                placeholder="Type your note"
                className="resize-none bg-transparent w-full h-[36rem] outline-none text-lg sm:h-[30rem]"
            />
            <button onClick={handleSave} className="fixed bottom-20 right-14">
                {loading ? <Loading addStyle={"fill-dark-100 h-10 w-10"} /> : <FontAwesomeIcon size="2xl" icon={faCheck} />}
            </button>
        </motion.div>
    );
}
