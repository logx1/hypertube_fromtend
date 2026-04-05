import { useState } from "react";
import styles from "./login.module.css";
import GradientButton from "~/components/Button/GradientButton";

export function meta() {
  return [
    { title: "Login - HyperTube" },
    { name: "description", content: "Log in to your account" },
  ];
}

export default function Login() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login user", { email, password });
  };

  const handleSignup = () => {
    console.log("Signup user", { email, password });
  };

  const mailIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
  const lockIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
  const eyeIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
      {/* 1. Top-Left Indigo Glow */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* 2. Bottom-Right Warm Glow */}
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <header className={styles.header}>
        <div className={styles.logoGroup}>
          <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="#a8a5ff">
            <circle cx="12" cy="12" r="10" fill="white"></circle>
            <polygon points="10 8 16 12 10 16 10 8" fill="#a8a5ff"></polygon>
          </svg>
          <span className={styles.logoText}>HyperTube</span>
        </div>
        <a href="/" className={styles.backLink}>Home</a>
      </header>

      <main className="relative z-10 flex-grow flex items-center justify-center">
        <div className={styles.loginBox}>
          <div className={styles.tabSwitcher}>
            <button
              onClick={() => setAuthMode('signin')}
              className={`${styles.tabButton} ${authMode === 'signin' ? styles.activeTab : ''}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`${styles.tabButton} ${authMode === 'signup' ? styles.activeTab : ''}`}
            >
              Sign Up
            </button>
          </div>

          <div className={styles.textContainer}>
            <h1 className={styles.mainTitle}>
              {authMode === 'signin' ? 'Welcome Back' : 'Welcome'}
            </h1>
            <p className={styles.subtitle}>
              {authMode === 'signin'
                ? 'Enter your credentials to access your library'
                : 'Create an account to start your journey'}
            </p>
          </div>

          <button className={styles.intraButton}>
            Continue with Intra
            <svg width="18" height="18" viewBox="0 -200 960 960" fill="currentColor">
              <polygon points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1 32,279.1" />
              <polygon points="597.9,114.2 762.7,-51.1 597.9,-51.1" />
              <polygon points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1" />
              <polygon points="928,279.1 762.7,443.9 928,443.9" />
            </svg>
          </button>

          <div className={styles.divider}>
            <div className={styles.line}></div>
            <span>OR EMAIL</span>
            <div className={styles.line}></div>
          </div>

          <form className={styles.formContainer} onSubmit={(e) => { e.preventDefault(); authMode === 'signin' ? handleLogin() : handleSignup(); }}>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>EMAIL ADDRESS</label>
              <div className={styles.inputWrapper}>
                <span className={styles.leftIcon}>{mailIcon}</span>
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
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>PASSWORD</label>
                {authMode === 'signin' && (
                  <a href="#" className={styles.forgotLink}>Forgot?</a>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.leftIcon}>{lockIcon}</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.nativeInput}
                />
                <span className={styles.rightIcon}>{eyeIcon}</span>
              </div>
            </div>

            <GradientButton
              type="submit"
              className="w-full mt-2"
            >
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </GradientButton>
          </form>

          <p className={styles.terms}>
            By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 HyperTube Inc. All rights reserved. Cinematic Experience Engineered.
      </footer>
    </div>
  );
}
