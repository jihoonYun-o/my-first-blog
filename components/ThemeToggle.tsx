"use client"

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted,  setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if(!mounted) return <div className="w-8 h-8"></div>;

    return( 
        <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="dark Mode">
                {theme === "dark" ? "🌙" : "☀️"}
        </button>

    );        
}