'use client'

import { signIn } from "next-auth/react"

export default function Welcome() {
    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to my application!</h1>
                <h3 className="text-2xl">To get started, please register</h3>
                <button onClick={() => signIn()} className="mt-4 px-4 py-1 bg-100 rounded-md">Register</button>
            </div>
        </section>
    )
}