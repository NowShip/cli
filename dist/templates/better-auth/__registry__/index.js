import dynamic from "next/dynamic";
export const PREVIEWS = {
    "animation-checkbox-and-submit": {
        name: "submit",
        component: dynamic(() => import("@/contents/animation/checkbox-and-submit/main"), {
            ssr: false,
        }),
        code: `"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";
import { CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import useMeasure from "react-use-measure";

type sportsTypes = Record<string, boolean>;

const sportsObject: sportsTypes = {
  Soccer: false,
  Basketball: false,
  Baseball: false,
  Tennis: false,
  Golf: false,
  Cricket: false,
  Rugby: false,
  Hockey: false,
  "Table Tennis": false,
  Badminton: false,
  Volleyball: false,
  "American Football": false,
  Boxing: false,
  MMA: false,
  Wrestling: false,
  Swimming: false,
  Athletics: false,
  Cycling: false,
  Gymnastics: false,
  Skiing: false,
  Snowboarding: false,
  Skateboarding: false,
  Surfing: false,
  Rowing: false,
  Sailing: false,
  Fencing: false,
  Judo: false,
  Karate: false,
  Taekwondo: false,
  Archery: false,
  Equestrian: false,
  Lacrosse: false,
  Handball: false,
  Softball: false,
  Squash: false,
  Racquetball: false,
  Bobsleigh: false,
  Curling: false,
  "Figure Skating": false,
  Diving: false,
};

export default function Work2() {
  const [filter, setFilter] = useState(false);

  const [values, setValues] = useState(sportsObject);

  const onClickHandler = () => setFilter(!filter);

  const [ref, { height }] = useMeasure();

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-xl font-bold tracking-tight text-white">
        What are your favorite language?
      </h1>

      <MotionConfig
        transition={{
          duration: 0.7,
          type: "spring",
          bounce: filter ? 0 : undefined,
        }}
      >
        <motion.div
          initial={{ height: "auto" }}
          animate={{ height: height > 0 ? height : undefined }}
        >
          <motion.ul ref={ref} className="mt-4 flex w-full flex-wrap gap-2">
            <LayoutGroup>
              <AnimatePresence initial={false} mode="popLayout">
                {Object.entries(values)
                  .filter(([key, value]) => !filter || value)
                  .map(([key, value]) => (
                    <EachSport
                      key={key}
                      sport={key}
                      isSelected={value}
                      setValues={setValues}
                    />
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </motion.ul>
        </motion.div>
      </MotionConfig>

      <div className="flex justify-center py-8">
        <button
          className="h-8 rounded border border-[#452C28] bg-[#1C1210] px-4 text-[#EA885A] duration-200 active:scale-95"
          onClick={onClickHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function EachSport({
  sport,
  setValues,
  isSelected,
}: {
  sport: string;
  setValues: Dispatch<SetStateAction<{}>>;
  isSelected: boolean;
}) {
  const onClickHandler = () => {
    setValues((prev) => ({ ...prev, [sport]: !isSelected }));
  };

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <motion.button
        layout
        className={cn(
          "flex h-10 items-center gap-2 border border-[#373538] bg-[#161417] px-4 text-[#A3A1A3]",
          isSelected && "border-[#452C28] bg-[#1C1210] text-[#EA885A]"
        )}
        style={{ borderRadius: 9999 }}
        onClick={onClickHandler}
      >
        <motion.span layout className="inline-block">
          {sport}
        </motion.span>

        {isSelected && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CircleCheck />
          </motion.span>
        )}
      </motion.button>
    </motion.li>
  );
}
`,
    },
    "animation-faq-spring": {
        name: "spring",
        component: dynamic(() => import("@/contents/animation/faq-spring/main"), {
            ssr: false,
        }),
        code: `import { useState } from "react";
import {
  Activity,
  ChevronDown,
  CloudDownload,
  Earth,
  PackageSearch,
} from "lucide-react";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence, MotionConfig } from "motion/react";

import { cn } from "@/lib/utils";

const faqData = [
  {
    id: 1,
    icon: <Activity />,
    question: "What is Motion?",
    answer:
      "Motion is a powerful animation library for React that enables you to create smooth, interactive animations with minimal code. It provides a simple API for creating complex animations and transitions.",
  },
  {
    id: 2,
    icon: <CloudDownload />,
    question: "How do I install Motion in my project?",
    answer:
      "You can install Motion using npm or yarn. Simply run 'npm install motion' or 'yarn add motion' in your project directory to get started.",
  },
  {
    id: 3,
    icon: <Earth />,
    question: "What browsers does Motion support?",
    answer:
      "Motion supports all modern browsers including Chrome, Firefox, Safari, and Edge. It uses the Web Animations API with fallbacks for broader compatibility.",
  },
  {
    id: 4,
    icon: <PackageSearch />,
    question: "Is Motion production-ready?",
    answer:
      "Yes, Motion is production-ready and is used by many companies in production environments. It's well-tested, performant, and actively maintained by the open source community.",
  },
];

export default function FaqSpring() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-96 flex-col">
      <MotionConfig transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}>
        {faqData.map((faq, index) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            active={active}
            setActive={setActive}
            index={index}
          />
        ))}
      </MotionConfig>
    </div>
  );
}

const ChevronDownMotion = motion(ChevronDown);

const FaqItem = ({
  faq,
  active,
  setActive,
  index,
}: {
  faq: (typeof faqData)[number];
  active: number;
  setActive: (id: number) => void;
  index: number;
}) => {
  const [ref, { height }] = useMeasure();

  const getBorderRadius = () => {
    const isActive = active === faq.id;
    const isFirst = index === 0;
    const isLast = index === faqData.length - 1;
    const activeIndex = faqData.findIndex((item) => item.id === active);
    const isDirectlyAboveActive = index === activeIndex - 1;
    const isDirectlyBelowActive = index === activeIndex + 1;

    return {
      borderTopLeftRadius:
        isFirst || isActive || (active > 0 && isDirectlyBelowActive) ? 20 : 0,
      borderTopRightRadius:
        isFirst || isActive || (active > 0 && isDirectlyBelowActive) ? 20 : 0,
      borderBottomLeftRadius:
        isLast || isActive || (active > 0 && isDirectlyAboveActive) ? 20 : 0,
      borderBottomRightRadius:
        isLast || isActive || (active > 0 && isDirectlyAboveActive) ? 20 : 0,
    };
  };

  const getBorderClasses = () => {
    const isActive = active === faq.id;
    const isFirst = index === 0;
    const isLast = index === faqData.length - 1;
    const activeIndex = faqData.findIndex((item) => item.id === active);
    const isDirectlyAboveActive = index === activeIndex - 1;
    const isDirectlyBelowActive = index === activeIndex + 1;

    return cn("relative overflow-hidden", "border-x", {
      "border-t": isFirst || isActive || isDirectlyBelowActive,
      "border-b": isLast || isActive || isDirectlyAboveActive,
    });
  };

  return (
    <motion.div
      initial={{
        borderTopLeftRadius: index === 0 ? 20 : 0,
        borderTopRightRadius: index === 0 ? 20 : 0,
        borderBottomLeftRadius: index === faqData.length - 1 ? 20 : 0,
        borderBottomRightRadius: index === faqData.length - 1 ? 20 : 0,
        height: "auto",
      }}
      animate={{
        height: height > 0 ? height : undefined,
        marginTop: active === faq.id && index !== 0 ? 20 : 0,
        marginBottom:
          active === faq.id && index !== faqData.length - 1 ? 20 : 0,
        ...getBorderRadius(),
      }}
      className={getBorderClasses()}
    >
      <div
        ref={ref}
        className="flex cursor-pointer flex-col gap-2 p-3"
        onClick={() => setActive(active === faq.id ? 0 : faq.id)}
      >
        <p className="flex items-center gap-3 font-semibold">
          {faq.icon}
          {faq.question}
          <ChevronDownMotion
            animate={{ rotate: active === faq.id ? 180 : 0 }}
            className="ml-auto"
            size={16}
          />
        </p>
        <AnimatePresence mode="popLayout">
          {active === faq.id && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm"
            >
              {faq.answer}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
`,
    },
    "animation-ios-app-store-card": {
        name: "card",
        component: dynamic(() => import("@/contents/animation/ios-app-store-card/main"), {
            ssr: false,
        }),
        code: `"use client";

import React, { useState } from "react";

import { AnimatePresence, MotionConfig, motion } from "motion/react";

import IphoneSimulator from "@/components/main-components/iphone-simulator";
import { NavigatingClick } from "@/components/navigating-click";

export default function Work1() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => setIsOpen(!isOpen);

  return (
    <IphoneSimulator
      classWrapper="w-[400px]"
      className="overflow-hidden bg-white [&>[data-top]]:bg-transparent"
    >
      <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
        <div className="px-4 pt-4 text-black">
          <h2 className="text-2xl font-semibold tracking-tight">
            Action-Packed
          </h2>

          <motion.div layoutId="wrapper" className="bg-white">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="relative mt-4 cursor-pointer overflow-hidden rounded-xl bg-white shadow-2xl"
              onClick={onClickHandler}
              style={{ borderRadius: 12 }}
            >
              <NavigatingClick />
              <motion.img
                layoutId="bg-image"
                src="https://ips4-wowslegends-global.gcdn.co/monthly_2022_02/Somers_US_T10_DD_Art_key-artwork-Release-4.1_1920x1080_WG_Spb_WoWSL_NoLogo.jpg.8aa1eb2cd9b0529ca9e4a64f918f757a.jpg"
                className="aspect-[4/4.7] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 isolate w-full">
                <motion.div
                  layoutId="gradient-bg"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-[#195C6C] to-transparent"
                />

                <div className="-translate-y-4 translate-x-4">
                  <motion.small
                    layoutId="top-small-layout"
                    className="relative flex items-center justify-start text-white/80 uppercase"
                  >
                    games we love
                  </motion.small>

                  <motion.h2
                    layoutId="top-title-layout"
                    className="text-2xl font-bold text-white"
                  >
                    World of Warships: Legends
                  </motion.h2>
                </div>

                <motion.div
                  className="relative isolate flex h-[70px] w-full items-center gap-2 px-4"
                  style={{
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
                  <motion.div
                    layoutId="bottom-background"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-[#195C6C] to-[#103b45]"
                  />

                  <motion.img
                    layoutId="bottom-image-layout"
                    src="https://play-lh.googleusercontent.com/haX300DkBrubUDWbfVQpx-Ke6Z4Ku6wHdX-yuGmfqLtMvqu2O0WglXmQK1scwLpQBYo"
                    className="aspect-square w-11 rounded-xl object-cover"
                  />
                  <motion.div layoutId="bottom-text-layout">
                    <h3 className="text-sm leading-4 font-medium text-white">
                      World of Warships: <br /> Legends MMO
                    </h3>
                    <p className="text-xs text-white opacity-55">
                      War games and naval battle...
                    </p>
                  </motion.div>
                  <motion.div
                    layoutId="bottom-button-layout"
                    className="ml-auto flex flex-col items-center justify-center gap-1 self-end pb-2"
                    style={{ flex: "0 0 auto" }}
                  >
                    <button className="h-7 w-14 rounded-full bg-white/30 text-white">
                      Get
                    </button>
                    <small className="text-[7px] text-white/55">
                      In-App Purchases
                    </small>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                layoutId="wrapper"
                className="absolute inset-0 bg-white"
              >
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="relative isolate z-20 cursor-pointer shadow-2xl"
                  onClick={onClickHandler}
                  style={{ borderRadius: 0 }}
                >
                  <motion.img
                    layoutId="bg-image"
                    src="https://ips4-wowslegends-global.gcdn.co/monthly_2022_02/Somers_US_T10_DD_Art_key-artwork-Release-4.1_1920x1080_WG_Spb_WoWSL_NoLogo.jpg.8aa1eb2cd9b0529ca9e4a64f918f757a.jpg"
                    className="aspect-[4/4.7] w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 isolate w-full">
                    <motion.div
                      layoutId="gradient-bg"
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-[#195C6C] to-transparent"
                    />

                    <motion.div
                      // layoutId="top-text-layout"
                      className="flex flex-col px-4 pb-8"
                    >
                      <motion.small
                        layoutId="top-small-layout"
                        className="relative flex items-center justify-start text-white/80 uppercase"
                      >
                        games we love
                      </motion.small>

                      <motion.h2
                        layoutId="top-title-layout"
                        className="text-2xl font-bold text-white"
                      >
                        World of Warships: Legends
                      </motion.h2>
                    </motion.div>
                    <motion.div
                      // layoutId="bottom-element-layout"
                      className="relative isolate flex h-[70px] w-full items-center gap-2 px-4"
                      style={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <motion.div
                        layoutId="bottom-background"
                        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#195C6C] to-[#103b45]"
                      />
                      <motion.img
                        layoutId="bottom-image-layout"
                        src="https://play-lh.googleusercontent.com/haX300DkBrubUDWbfVQpx-Ke6Z4Ku6wHdX-yuGmfqLtMvqu2O0WglXmQK1scwLpQBYo"
                        className="aspect-square w-11 rounded-xl object-cover"
                      />
                      <motion.div layoutId="bottom-text-layout">
                        <h3 className="text-sm leading-4 font-medium text-white">
                          World of Warships: <br /> Legends MMO
                        </h3>
                        <p className="text-xs text-white opacity-55">
                          War games and naval battle...
                        </p>
                      </motion.div>
                      <motion.div
                        layoutId="bottom-button-layout"
                        className="ml-auto flex flex-col items-center justify-center gap-1 self-end pb-2"
                        style={{ flex: "0 0 auto" }}
                      >
                        <button className="h-7 w-14 rounded-full bg-white/30 text-white">
                          Get
                        </button>
                        <small className="text-[7px] text-white/55">
                          In-App Purchases
                        </small>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="overflow-auto p-4"
                >
                  <p className="text-lg leading-6 text-[#959597]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias velit explicabo{" "}
                    <b className="text-black">cupiditate</b> libero aliquid ea
                    fuga iure aut minima possimus! Deleniti veritatis dicta
                    eligendi veniam quaerat saepe doloribus itaque debitis.
                  </p>

                  <p className="mt-4 text-lg leading-6 text-[#959597]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias velit explicabo{" "}
                    <b className="text-black">cupiditate</b> libero aliquid ea
                    fuga iure aut minima possimus! Deleniti veritatis dicta
                    eligendi veniam quaerat saepe doloribus itaque debitis.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </IphoneSimulator>
  );
}
`,
    },
    "animation-theme-toggle": {
        name: "toggle",
        component: dynamic(() => import("@/contents/animation/theme-toggle/main"), {
            ssr: false,
        }),
        code: `import { useState } from "react";
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
            transform: \`scale(\${isChangeTheme ? 0.9 : 1}) translateY(\${isChangeTheme ? 10 : 0}px)\`,
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
                              layoutId={\`theme-toggle\`}
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
`,
    },
    "reusable-components-infinite-move-preview": {
        name: "preview",
        component: dynamic(() => import("@/contents/reusable-components/infinite-move/preview"), {
            ssr: false,
        }),
        code: `import React from "react";

import { InfiniteMove, InfiniteMoveItem } from "./main";

export default function InfiniteMove1() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <InfiniteMove mask="xs" whenHover="pause" duplicate={2}>
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>
      <InfiniteMove mask="xs" whenHover="pause" duration={20}>
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>
      <InfiniteMove mask="xs" whenHover="pause" direction="reverse">
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>

      <InfiniteMove
        mask="xs"
        direction="reverse"
        orientation="vertical"
        wrapperClassName="h-48"
        duration={10}
      >
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>
    </div>
  );
}
`,
    },
    "reusable-components-video-explains-aspect-ratio": {
        name: "ratio",
        component: dynamic(() => import("@/contents/reusable-components/video/explains/aspect-ratio"), {
            ssr: false,
        }),
        code: `import React from "react";
import { Video } from "../main";

type Props = {};

export default function AspectRatioExplain({}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <Video
          src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
          aspectRatio={16 / 9}
          controls
          className="max-w-sm rounded-xl"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          culpa accusantium sapiente veniam consequatur eaque, molestiae dolorem
          earum et eius esse ea suscipit est mollitia cupiditate quia deleniti
          magni saepe!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <video
          src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
          controls
          className="max-w-sm rounded-xl"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          culpa accusantium sapiente veniam consequatur eaque, molestiae dolorem
          earum et eius esse ea suscipit est mollitia cupiditate quia deleniti
          magni saepe!
        </p>
      </div>
    </div>
  );
}
`,
    },
    "reusable-components-video-explains-data-active": {
        name: "active",
        component: dynamic(() => import("@/contents/reusable-components/video/explains/data-active"), {
            ssr: false,
        }),
        code: `import React from "react";
import { Video } from "../main";

type Props = {};

export default function DataActiveExplain({}: Props) {
  return (
    <Video
      src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
      aspectRatio={16 / 9}
      controls
      className="max-w-sm rounded-xl"
    />
  );
}
`,
    },
    "reusable-components-video-preview": {
        name: "preview",
        component: dynamic(() => import("@/contents/reusable-components/video/preview"), {
            ssr: false,
        }),
        code: `import React from "react";
import { Video, VideoShadow } from "./main";

export default function VideoPreview() {
  return (
    <VideoShadow className="max-w-xl">
      <Video
        src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
        aspectRatio={16 / 9}
        controls
        className="rounded-xl"
      />
    </VideoShadow>
  );
}
`,
    },
};
export const COMPONENTS = {
    "iphone-simulator": {
        name: "simulator",
        component: dynamic(() => import("@/components/main-components/iphone-simulator"), {
            ssr: false,
        }),
        code: `import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  classWrapper?: string;
};

export default function IphoneSimulator({
  children,
  className,
  classWrapper,
}: Props) {
  return (
    <div
      className={cn(
        "relative flex aspect-[9/18.5505] max-h-[825px] min-h-[825px] w-[380px] flex-col overflow-hidden rounded-[56px] bg-[#C1C1C1] p-[6.62px]",
        classWrapper
      )}
    >
      <div className="w-full grow overflow-auto rounded-[51px] bg-black p-[7.76px]">
        <div
          className={cn(
            "no-scrollbar relative isolate h-full w-full overflow-auto rounded-[42px] bg-[#636363]",
            className
          )}
        >
          <div
            data-top
            className="sticky top-0 z-50 flex h-[48px] shrink-0 items-center justify-center bg-inherit"
          >
            <div className="h-[28.43px] w-[96.25px] rounded-full bg-black"></div>
          </div>
          <div className="min-h-[calc(100%-48px)] pb-[26px]">{children}</div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex h-[20px] shrink-0 -translate-x-1/2 items-center justify-center">
        <div className="h-[3.21px] w-[105.58px] rounded-full bg-[#C1C1C1]"></div>
      </div>
    </div>
  );
}
`,
    },
};
