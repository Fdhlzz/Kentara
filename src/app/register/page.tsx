/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerFarmer } from "@/lib/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "", fullName: "" },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        try {
            await registerFarmer(values);
            toast.success("Account created successfully!");
            router.push("/");
        } catch (error: any) {
            console.error("Registration Error:", error);

            if (error.code === "auth/email-already-in-use") {
                toast.error("This email is already registered. Please login instead.");
            } else {
                toast.error(error.message || "Registration failed. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <AuthWrapper
            title="Join Kentara"
            description="Start your journey with premium seeds"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <FormControl>
                                        <Input placeholder="Budi Santoso" className="pl-9" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <FormControl>
                                        <Input placeholder="farmer@example.com" className="pl-9" {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" className="pl-9" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/20 h-11 mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                    </Button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-500">Already have an account? </span>
                        <Link href="/login" className="text-sm font-semibold text-green-700 hover:underline">
                            Login here
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthWrapper>
    );
}