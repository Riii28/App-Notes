"use client";

import { useAppState } from "@/store/app_state";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function Confirm({ title, func }: { title: string; func: string }) {
    const { refresh } = useRouter();
    const { confirmState, setConfirmState } = useAppState();
    const [handle, setHandle] = useState<() => Promise<void> | undefined>();

    const handleAction = useCallback(async (endpoint: string) => {
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
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

            toast.success(result.message);
            refresh();
            setConfirmState();
        } catch (err) {
            console.error(`Error clearing ${endpoint}:`, err);
        }
    }, [refresh, setConfirmState]);

    useEffect(() => {
        setHandle(() => {
            switch (func) {
                case "CLEAR_NOTES":
                    return () => handleAction("/api/notes");
                case "CLEAR_FOLDERS":
                    return () => handleAction("/api/folders");
                default:
                    return undefined;
            }
        });
    }, [func, handleAction]);

    if (!confirmState) return null;

    return (
        <div className="fixed w-full h-full z-50 bg-transparent">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-8 bg-white dark:bg-gray-800 transition-colors duration-200 w-80 p-4 rounded-md shadow-md">
                <h1 className="text-xl">{title}</h1>
                <div className="flex justify-end gap-x-6 text-dark-300 dark:text-light-100">
                    <button onClick={setConfirmState} className="active:scale-95">
                        Cancel
                    </button>
                    <button onClick={() => handle?.()} className="active:scale-95">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}