"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createUserFormSchema = z.object({
    username: z.string().nonempty({ message: "Username is required." }).regex(/^[A-Za-z]+$/i, "Only letters are allowed"),
    email: z.string().email().nonempty({ message: "Email is required." }),
    password: z.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(30, "Password must be at most 30 characters long.")
        .regex(/[a-z]+/, { message: "The Password must contain at least 1 lowercase letter." })
        .regex(/[A-Z]+/, { message: "The Password must contain at least 1 capital letter." })
        .regex(/[@$!%*#?&]/, { message: "The Password must contain at least 1 capital letter. The Password must contain at least 1 special character." })
        .regex(/[0-9]+/, { message: "The Password must contain at least 1 number." })
        .nonempty({ message: "Password is required." }),
    confirm_password: z.string().nonempty({ message: "Confirm password is required." })
})
    .refine(({ password, confirm_password }) => password === confirm_password, {
        message: "Password doesn't match.",
        path: ["confirm_password"]
    })

export default function Register() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors } } = useForm<z.infer<typeof createUserFormSchema>>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues: {
                username: "",
                email: "",
                password: "",
                confirm_password: ""
            },
        })

    async function onSubmit(data: z.infer<typeof createUserFormSchema>) { }

    return (
        <div>
            <h1>Register</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Username" {...register('username')} />
                {errors.username && (
                    <span className="text-red-500 block text-xs username">
                        {errors.username?.message}
                    </span>
                )}
                <input type="email" placeholder="Email" {...register('email')} />
                {errors.email && (
                    <span className="text-red-500 block text-xs email">
                        {errors.email?.message}
                    </span>
                )}
                <input type="password" placeholder="Password" {...register('password')} />
                {errors.password && (
                    <span className="text-red-500 block text-xs password">
                        {errors.password?.message}
                    </span>
                )}
                <input type="password" placeholder="Confirm Password" {...register('confirm_password')} />
                {errors.confirm_password && (
                    <span className="text-red-500 block text-xs confirmPassword">
                        {errors.confirm_password?.message}
                    </span>
                )}
                <button type="submit" className="register">Register</button>
            </form>
        </div>
    )
}