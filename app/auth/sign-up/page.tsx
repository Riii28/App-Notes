'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

interface SignUpData {
    fullname: string
    email: string
    password: string
}

export default function SignUp() {
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset, formState: {errors} } = useForm<SignUpData>()
    const router = useRouter()

    const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => { 
        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            
            if (!response.ok) {
                throw new Error('Failed to register')
            }

            const result = await response.json()

            if (!result.status) {
                setMessage(result.message)
                return
            }

            reset()
            router.push('/auth/sign-in')
        } catch (err) {
            throw new Error('Error during registration')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Link className="fixed top-5 left-5 px-4 py-1 rounded-md" href={'/'}>Return</Link>
            <div className="w-80 bg-light shadow-md rounded-md p-4">
                <h1 className="font-bold text-2xl">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 mt-12 text-dark-300">
                    <label htmlFor="fullname">Name:</label>
                    <input 
                        type="text" 
                        id="fullname"
                        placeholder="Your fullname"
                        className="px-2 py-1 rounded-md outline-none"
                        autoComplete="off"
                        autoFocus
                        {...register("fullname", { 
                            required: "Fullname is required", 
                            maxLength: {
                                value: 100,
                                message: 'Max character'
                            }
                        })}
                    />
                    {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname.message}</span>}

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email" 
                        id="email"
                        placeholder="Your email"
                        className="px-2 py-1 rounded-md outline-none"
                        autoComplete="off"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Your password"
                        className="px-2 py-1 rounded-md outline-none"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    <span className="text-sm mt-4">Have registered? <Link className="text-blue-600" href={'/auth/sign-in'}>sign in</Link></span>

                    <button className="mt-4 rounded-md px-2 py-1 bg-100">
                        {loading ? (
                            '...Loading'
                        ) : (
                            'Sign up'
                        )}
                    </button>
                    <span className="text-sm">{message}</span>
                </form>
            </div>
        </div>
    )
}
