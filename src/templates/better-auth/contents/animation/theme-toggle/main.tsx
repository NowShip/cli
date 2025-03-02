import { useState } from "react";
import {
  Archive,
  Blend,
  Bolt,
  ChartPie,
  ChevronDown,
  Earth,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

import IphoneSimulator from "@/components/main-components/iphone-simulator";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [toggleTheme, setToggleTheme] = useState<Theme>("light");
  const [isChangeTheme, setIsChangeTheme] = useState(false);

  const onThemeChange = () => {
    const theme = toggleTheme === "light" ? "dark" : "light";

    setIsChangeTheme(true);
    setToggleTheme(theme);

    setTimeout(() => {
      setTheme(theme);
    }, 650);
    setTimeout(() => {
      setIsChangeTheme(false);
    }, 500);
  };

  return (
    <IphoneSimulator
      className={cn(
        "text-black transition-colors duration-700 [&>[data-top]]:bg-transparent",
        theme === "dark" &&
          "text-white [&>[data-top]>div]:bg-neutral-800 [&>[data-top]>div]:transition-colors [&>[data-top]>div]:duration-500"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-20 bg-white transition-colors duration-500",
          theme === "dark" && "bg-black"
        )}
      />
      <MotionConfig transition={{ duration: 0.25, ease: "easeOut" }}>
        <motion.div
          initial={{ transform: "scale(1) translateY(0)" }}
          animate={{
            transform: `scale(${isChangeTheme ? 0.9 : 1}) translateY(${isChangeTheme ? 10 : 0}px)`,
          }}
          transition={{ duration: 0.47, ease: [0.85, 0, 0.15, 1] }}
        >
          <header className="relative flex items-center justify-center">
            <button
              className="flex items-center gap-1 font-semibold"
              onClick={() => setIsOpen(!isOpen)}
            >
              menu{" "}
              <motion.span
                animate={{
                  rotate: isOpen ? 180 : 0,
                }}
                className="will-change-transform"
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
          </header>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="flex items-end overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
              >
                <div
                  className={cn(
                    "mt-4 flex w-full flex-col justify-end border-t px-8 pt-4 transition-[border-color] duration-500",
                    theme === "dark" && "border-neutral-700"
                  )}
                >
                  <button className="flex h-8 shrink-0 items-center gap-2">
                    <Archive size={18} className="text-contrast-low" /> Archive
                    sessions
                  </button>
                  <button className="flex h-8 shrink-0 items-center gap-2">
                    <ChartPie size={18} className="text-contrast-low" /> 20
                    sheets left
                  </button>
                  <button className="flex h-8 shrink-0 items-center gap-2">
                    <Earth size={18} className="text-contrast-low" /> Language
                  </button>
                  <button
                    className="flex h-8 shrink-0 items-center justify-between gap-2"
                    onClick={onThemeChange}
                  >
                    <span className="flex items-center gap-2">
                      <Blend size={18} className="text-contrast-low" />{" "}
                      Appearance
                    </span>
                    <span
                      className={cn(
                        "flex rounded-full border border-neutral-300 bg-neutral-200 p-px text-xs transition-[background-color,border-color] duration-500",
                        theme === "dark" && "border-neutral-700 bg-neutral-800"
                      )}
                    >
                      {["light", "dark"].map((value) => (
                        <span
                          key={value}
                          className="relative rounded-full px-2"
                        >
                          <span className="relative z-10">{value}</span>

                          {toggleTheme === value && (
                            <motion.span
                              layoutId={`theme-toggle`}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className={cn(
                                "absolute inset-0 rounded-full bg-white transition-none",
                                theme === "dark" && "bg-neutral-500"
                              )}
                            />
                          )}
                        </span>
                      ))}
                    </span>
                  </button>
                  <button className="flex h-8 shrink-0 items-center gap-2">
                    <Bolt size={18} className="text-contrast-low" /> Settings
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 px-4">
            <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-neutral-700">
              Content
            </div>
          </div>
        </motion.div>
      </MotionConfig>
    </IphoneSimulator>
  );
}
