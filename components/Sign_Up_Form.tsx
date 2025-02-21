'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { variants } from "@/utils/transitions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

interface Data {
    fullname: string
    email: string
    password: string
    confirmPassword: string
}

export default function SignUpForm() {
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, handleSubmit, reset, watch ,formState: {errors} } = useForm<Data>()
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const router = useRouter()

    async function onSubmit(data: Data) { 
        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname: data.fullname,
                    email: data.email,
                    password: data.password
                }),
            })
            
            if (!response.ok) {
                throw new Error('Failed to register')
            }

            const result = await response.json()

            if (!result.success) {
                setMessage(result.message)
                return
            }

            reset()
            router.push('/auth/sign-in')
            setMessage(result.message)
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <motion.form 
            initial="initial"
            animate="animate"
            variants={variants.fadeIn}
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-y-2 mt-12 text-dark-300"
        >
            <label htmlFor="fullname">Name:</label>
            <input 
                type="text" 
                id="fullname"
                placeholder="Your fullname"
                className="px-2 py-1 rounded-md outline-none text-dark-300"
                autoComplete="off"
                disabled={loading}
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
                className="px-2 py-1 rounded-md outline-none text-dark-300"
                autoComplete="off"
                disabled={loading}
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
            <div className="relative">
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password"
                    placeholder="Your password"
                    className="px-2 py-1 rounded-md outline-none text-dark-300 w-full"
                    disabled={loading}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-white p-1"
                    cursor='pointer'
                />
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="relative">
                <input 
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="px-2 py-1 rounded-md outline-none text-dark-300 w-full"
                    disabled={loading}
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === watch("password") || "Passwords do not match"
                    })}
                />
                <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-white p-1"
                    cursor='pointer'
                />
            </div>

            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

            <span className="text-sm mt-4">Have registered? <Link className="text-blue-600" href={'/auth/sign-in'}>sign in</Link></span>

            <button className="mt-4 rounded-md px-2 py-1 bg-100">
                {loading ? 'Loading...' : 'Sign up'}
            </button>

            <span className="text-sm">{message}</span>
        </motion.form>
    )
}