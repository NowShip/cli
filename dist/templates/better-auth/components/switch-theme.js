import { useTheme } from "next-themes";
import { LayoutGroup, motion } from "motion/react";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
const themes = [
    { name: "light", icon: <Sun size={16}/> },
    { name: "dark", icon: <Moon size={16}/> },
    { name: "system", icon: <Monitor size={16}/> },
];
export function SwitchTheme() {
    const { setTheme, theme } = useTheme();
    return (<LayoutGroup id={`theme-${Math.random()}`}>
      <div className="bg-background inline-flex items-center rounded-2xl border p-0.5">
        {themes.map((themeOption) => (<button key={themeOption.name} className={cn("relative flex size-6 items-center justify-center rounded-full", themeOption.name !== theme && "text-muted")} onClick={() => setTheme(themeOption.name)}>
            <span className="relative">{themeOption.icon}</span>

            {themeOption.name === theme && (<motion.div layoutId="theme-indicator" transition={{
                    duration: 0.2,
                }} className="bg-contrast-higher/10 absolute inset-0 rounded-full"/>)}
          </button>))}
      </div>
    </LayoutGroup>);
}
