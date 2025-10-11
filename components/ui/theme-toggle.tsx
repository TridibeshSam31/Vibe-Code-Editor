"use client";

import { useTheme } from "next-themes";
import { useEffect , useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle(){
    const {setTheme , theme} = useTheme();
    const [mounted , setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    } , []);

    if(!mounted){
        return (
            <div className="h-5 w-5" /> // Placeholder to prevent layout shift
        );
    }

    return (
        <button 
            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={()=>{
                setTheme(theme === "light" ? "dark" : "light");
            }}
            aria-label="Toggle theme"
        >
            {
                theme === "light" ? (
                    <Moon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                ) : (
                    <Sun className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                )
            }
        </button>
    )
}