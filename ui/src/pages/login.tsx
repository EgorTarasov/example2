import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from '@tanstack/react-router'
import { observer } from "mobx-react";
import { useStores } from '@/hooks/useStore'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(50, {
        message: "Username must not exceed 50 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const LoginPage: React.FC = observer(() => {
    const { rootStore } = useStores()

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setError('')

        try {
            // // Simulated API call
            // await new Promise(resolve => setTimeout(resolve, 1000))
            // await rootStore.login({ email: values.username, password: values.password })
            // // Replace this with your actual authentication logic
            rootStore.login({
                 email: values.username, 
                 password: values.password 
                }
            ).then(() => {
                navigate({ to: '/dashboard' })
            }).finally(() => {
                setIsLoading(false)
            })

            if(rootStore.userRecord){
                navigate({ to: '/dashboard' })
            }



        } catch (err) {
            setError('Invalid username or password')
            // setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your username" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your unique username for the application.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Log in'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    {/* <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p> */}
                </CardFooter>
            </Card>
        </div>
    )
})

export default LoginPage

