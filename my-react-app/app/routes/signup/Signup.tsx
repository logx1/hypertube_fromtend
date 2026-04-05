import { useState } from "react";
import styles from "./signup.module.css";
import GradientButton from "~/components/Button/GradientButton";
import Logo from "~/components/Button/Logo";

export function meta() {
    return [
        { title: "Sign Up - HyperTube" },
        { name: "description", content: "Create your HyperTube account" },
    ];
}

export default function Signup() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        console.log("Creating acount:", { username, email, password });
    }
    const getPasswordStrength = (pwd: string): { level: number; text: string; color: string } => {
        if (pwd.length === 0) return { level: 0, text: "", color: "transparent" };
        if (pwd.length < 6) return { level: 1, text: "Weak", color: "#ef4444" };

        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score <= 1) return { level: 1, text: "Weak", color: "#ef4444" };
        if (score === 2) return { level: 2, text: "Fair", color: "#f97316" };
        if (score === 3) return { level: 3, text: "Good", color: "#eab308" };
        return { level: 4, text: "Strong", color: "#22c55e" };
    };

    const passwordStrength = getPasswordStrength(password);
    const isFormValid =
        username.length > 0 &&
        email.length > 0 &&
        passwordStrength.level >= 3 &&
        password === confirmPassword &&
        confirmPassword.length > 0;

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
                <form className={styles.formContainer} onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup();

                }}>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>First name</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="first name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className={styles.nativeInput}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Last name</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="last name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className={styles.nativeInput}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Username</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="omakran"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.nativeInput}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Email address</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.nativeInput}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Password</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.nativeInput}
                            />
                        </div>
                    </div>

                    {password.length > 0 && (
                        <div style={{ marginTop: "8px" }}>
                            <div style={{
                                height: "4px",
                                borderRadius: "2px",
                                backgroundColor: "#1a1f2e",
                                overflow: "hidden",
                            }}>
                                <div style={{
                                    height: "100%",
                                    width: `${(passwordStrength.level / 4) * 100}%`,
                                    backgroundColor: passwordStrength.color,
                                    transition: "all 0.3s ease",
                                }} />
                            </div>
                            {/* The text label */}
                            <span style={{
                                fontSize: "11px",
                                color: passwordStrength.color,
                                marginTop: "4px",
                                display: "block",
                            }}>
                                {passwordStrength.text}
                            </span>
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Confirm password</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.nativeInput}
                            />
                        </div>
                    </div>
                    {confirmPassword.length > 0 && password !== confirmPassword && (
                        <span style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px" }}>
                            Passwords do not match
                        </span>
                    )}
                    <GradientButton
                        type="submit"
                        className="w-full mt-2"
                        disabled={!isFormValid}
                    >
                        Create Account
                    </GradientButton>
                </form>
            </main>

            <footer className={styles.footer}>
                © 2026 HyperTube Inc. All rights reserved. Cinematic Experience Engineered.
            </footer>
        </div>
    );
}