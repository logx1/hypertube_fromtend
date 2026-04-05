import { useState } from "react";
import styles from "./signup.module.css";
import GradientButton from "~/components/Button/GradientButton";
import { Play } from "lucide-react";
import Logo from "~/components/Button/Logo";

export function meta() {
    return [
        { title: "Sign Up - HyperTube" },
        { name: "description", content: "Create your HyperTube account" },
    ];
}

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        console.log("Creating acount:", { username, email, password });
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary/10 rounded-full blur-[120px] pointer-events-none" />
            <Logo />
            <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-center mb-2">Create your account</h1>
                    <p className="text-center text-text-secondary mb-8">Join HyperTube and start watching movies and TV shows</p>
                </div>
                {/* Form abaana hh */}
            </main>

            <footer className={styles.footer}>
                © 2026 HyperTube Inc. All rights reserved. Cinematic Experience Engineered.
            </footer>
        </div>
    );
}