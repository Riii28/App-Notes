
// export default function SignIn() {
//     return (
//         <div className="h-screen w-screen flex justify-center items-center">
//             <div className="flex h-96">
//                 <div className="w-96 rounded-l-md p-4 bg-100">
//                     <h1 className="font-bold">Welcome back!</h1>
//                 </div>
//                 <div className="w-96 rounded-r-md p-4 bg-400">
//                     <h1>Right side</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'

import { useTheme } from "@/store/theme"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface Data {
    email: string
    password: string
}

export default function SignIn() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Data>()
    const { syncTheme } = useTheme()

    async function onSubmit(data: Data) {
        setLoading(true)
        try {
            const response = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: '/home'
            })

            if (!response?.ok) {
                setMessage('Invalid password or email')
                return
            }

            reset()
            setMessage('Success')
            router.push('/home')
            syncTheme()
        } catch (err) {
            throw new Error('Error during sign-in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-80 bg-light shadow-md rounded-md p-4">
                <h1 className="font-bold text-2xl">Welcome back!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 mt-6">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Your email"
                        autoComplete="off"
                        className="px-2 py-1 rounded-md outline-none text-dark-300"
                        disabled={loading}
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            }
                        })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Your password"
                        className="px-2 py-1 rounded-md outline-none text-dark-300"
                        disabled={loading}
                        {...register("password", { 
                            required: "Password is required" 
                        })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    <p className="text-sm mt-4">Not registered? <Link className="text-blue-600" href={'/auth/sign-up'}>create account</Link></p>

                    <button type="submit" className="mt-4 rounded-md px-2 py-1 bg-100">
                        {loading ? (
                            'Loading...'
                        ) : (
                            'Sign in'
                        )}
                    </button>
                    <p className="text-sm text-red-500">{message}</p>
                </form>
            </div>
        </div>
    )
}
