import SignInForm from "@/components/Sign_In_Form"

export default function SignIn() {
    return (
        <section className="h-screen w-screen flex justify-center items-center bg-form">
            <div className="w-80 bg-light-200 shadow-md rounded-md p-4">
                <h1 className="font-bold text-2xl">Welcome back!</h1>
                <SignInForm />
            </div>
        </section>
    )
}
