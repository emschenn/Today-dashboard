import { useState, useEffect } from "react";
import i18n from "i18next";

import { Select } from "@chakra-ui/react";
export default function Header() {
  const [lang, setLang] = useState("zh");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <header className="fixed z-10 hidden h-10 w-screen items-center justify-end bg-transparent  md:flex">
      <div className="px-4">
        <Select
          variant="unstyled"
          name="language"
          onChange={(e) => setLang(e.target.value)}
          value={lang}
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
        </Select>
      </div>
    </header>
  );
}
