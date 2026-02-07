"use client";

import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

interface AuthWrapperProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthWrapper({ children, title, description }: AuthWrapperProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 p-4">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-green-200/20 rounded-full blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-emerald-200/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20 mb-4">
                        <Sprout size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
                    <p className="text-sm text-gray-500 mt-2">{description}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 md:p-8">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}