import { createContext } from "react";

export interface LangProps {
  lang: "en" | "fr";
  data: any;
}

const LanguagesContext = createContext<LangProps | null>({
  lang: "en",
  data: null,
});

export default LanguagesContext;
