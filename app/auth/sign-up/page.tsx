import SignUpForm from "@/components/Sign_Up_Form";

export default function SignUp() {
    return (
        <section className="h-screen w-screen flex justify-center items-center bg-form">
            <div className="w-80 bg-light-200 shadow-md rounded-md p-4">
                <h1 className="font-bold text-2xl">Create an account</h1>
                <SignUpForm />
            </div>
        </section>
    )
}
