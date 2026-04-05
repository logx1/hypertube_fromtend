import { useState } from "react";
import styles from "./signup.module.css";
import GradientButton from "~/components/Button/GradientButton";

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

    return (
        <div>
            <h1> Signup page works! </h1>
        </div>
    );
}