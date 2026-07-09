import { createContext } from "react";

const LanguagesContext = createContext<"en" | "fr">("en");

export default LanguagesContext;
