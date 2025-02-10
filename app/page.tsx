import Link from "next/link"

export default function Welcome() {
    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to my application!</h1>
                <h3 className="text-2xl mb-4">To get started, please register</h3>
                <Link 
                    href={'/auth/sign-up'} 
                    className="px-4 py-1 bg-100 rounded-md"
                >
                    Register
                </Link>
            </div>
        </section>
    )
}