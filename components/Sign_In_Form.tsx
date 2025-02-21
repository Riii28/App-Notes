'use client'

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTheme } from "@/store/theme"
import { motion } from "framer-motion"
import { variants } from "@/utils/transitions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

interface Data {
    email: string
    password: string
}

export default function SignInForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
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
            console.error(err)
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
            className="flex flex-col gap-y-2 mt-6 text-dark-300"
        >
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
            <div className="relative">
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password"
                    placeholder="Your password"
                    className="px-2 py-1 rounded-md outline-none text-dark-300 w-full"
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

            <p className="text-sm mt-4">Not registered? <Link className="text-blue-600" href={'/auth/sign-up'}>create account</Link></p>

            <button type="submit" className="mt-4 rounded-md px-2 py-1 bg-100">
                {loading ? 'Loading...' : 'Sign in'}
            </button>
            <p className="text-sm text-red-500">{message}</p>
        </motion.form>
    )
}
