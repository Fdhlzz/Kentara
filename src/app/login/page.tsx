/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginUser } from "@/lib/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true);
        try {
            await loginUser(values);
            toast.success("Welcome back to Kentara!");
            router.push("/");
        } catch (error: any) {
            toast.error("Invalid credentials.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthWrapper
            title="Welcome Back"
            description="Sign in to access your seed inventory"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Email</FormLabel>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <FormControl>
                                        <Input
                                            placeholder="farmer@kentara.com"
                                            className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Password</FormLabel>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/20 h-11"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span className="flex items-center">
                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        )}
                    </Button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-500">Don't have an account? </span>
                        <Link href="/register" className="text-sm font-semibold text-green-700 hover:underline">
                            Create Account
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthWrapper>
    );
}