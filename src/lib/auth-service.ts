import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
    fullName: z.string().min(2, "Name is too short"),
});

export const registerFarmer = async (data: z.infer<typeof registerSchema>) => {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: data.fullName,
        email: data.email,
        role: "farmer",
        createdAt: new Date(),
    });

    return user;
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const logoutUser = () => signOut(auth);