import React from "react";
import { useLanguage } from "./LanguageProvider";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end", padding: 8 }}>
      <button
        onClick={() => setLang("en")}
        style={{ fontWeight: lang === "en" ? "bold" : "normal", background: "none", border: "none", cursor: "pointer" }}
        aria-label="Switch to English"
      >
        English
      </button>
      <span>|</span>
      <button
        onClick={() => setLang("mr")}
        style={{ fontWeight: lang === "mr" ? "bold" : "normal", background: "none", border: "none", cursor: "pointer" }}
        aria-label="Switch to Marathi"
      >
        मराठी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
