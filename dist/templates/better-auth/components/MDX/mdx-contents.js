/* eslint-disable */
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import { cn, sortMotionBySlug } from "@/lib/utils";
import TechIcons from "./tech-icons";
import CopyButton from "./copy-button";
import ComponentPreview from "../component-preview";
import { Tab } from "./tabs";
import { Tabs } from "./tabs";
import { allDocuments } from "@/.contentlayer/generated";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import UsedComponents from "./used-components";
import ProtectSection from "./protect-section";
const components = {
    h1: (_a) => {
        var { className, children } = _a, props = __rest(_a, ["className", "children"]);
        return (<h1 className="group hover:text-primary-hover mb-8 flex scroll-m-12 items-center gap-2 text-3xl font-bold [&_a]:text-inherit [&_code]:text-[21px] [&+p]:mt-0!" {...props}>
      {children}

      <svg viewBox="0 0 16 16" height="0.7em" width="0.7em" className="hidden group-hover:block">
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"></path>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"></path>
        </g>
      </svg>
    </h1>);
    },
    h2: (_a) => {
        var { className, children } = _a, props = __rest(_a, ["className", "children"]);
        return (<h2 className="group hover:text-primary-hover [&_a:hover]:text-primary-hover mt-12 mb-6 flex w-full scroll-m-12 items-center gap-2 text-lg font-medium [&_a]:text-inherit [&_code]:text-[21px] [&+p]:mt-0!" {...props}>
      {children}
      <svg viewBox="0 0 16 16" height="0.6em" width="0.6em" className="hidden group-hover:block">
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"></path>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"></path>
        </g>
      </svg>
    </h2>);
    },
    h3: (_a) => {
        var { className, children } = _a, props = __rest(_a, ["className", "children"]);
        return (<h3 className="group hover:text-primary-hover [&_a:hover]:text-primary-hover mt-[1.6rem] mb-[0.6rem] flex scroll-m-12 items-center gap-2 text-xl font-medium [&_a]:text-inherit [&_code]:text-[21px] [&+p]:mt-0!" {...props}>
      {children}
      <svg viewBox="0 0 16 16" height="0.6em" width="0.6em" className="hidden group-hover:block">
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"></path>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"></path>
        </g>
      </svg>
    </h3>);
    },
    h4: (_a) => {
        var { className, children } = _a, props = __rest(_a, ["className", "children"]);
        return (<h4 className="group hover:text-primary-hover [&_a:hover]:text-primary-hover mt-[1.6rem] mb-[0.6rem] flex scroll-m-12 items-center gap-2 font-medium [&_a]:text-inherit [&_code]:text-[21px] [&+p]:mt-0!" {...props}>
      {children}
      <svg viewBox="0 0 16 16" height="0.6em" width="0.6em" className="hidden group-hover:block">
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"></path>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"></path>
        </g>
      </svg>
    </h4>);
    },
    p: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<p className="my-5" {...props}/>);
    },
    ul: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<ul className="my-5 scroll-m-20 pl-8 text-base leading-7" {...props}/>);
    },
    li: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<li className="relative my-2 before:absolute before:top-3 before:h-px before:w-[6.8px] before:-translate-x-5 before:bg-[#888]" {...props}/>);
    },
    code: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<code className="border-code bg-code rounded-md px-[0.25rem] py-[0.12rem] text-sm" {...props}></code>);
    },
    blockquote: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<blockquote className="rounded-md border p-[22.4px] text-sm [&_code]:text-xs [&_li]:block [&_li]:text-sm [&_p]:my-0" {...props}></blockquote>);
    },
    table: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<table className={cn("bg-background [&_a>code:hover]:text-opacity-70 [&_a>code]:!text-primary my-8 w-full overflow-hidden rounded-xl text-sm shadow-sm [&_code]:text-[12.25px]", className)} {...props}/>);
    },
    thead: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<thead className={cn("bg-contrast-high/5 w-full [&_tr]:border-t-0", className)} {...props}/>);
    },
    tr: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<tr className={cn("grid min-h-[41px] grid-cols-4 border-t", className)} {...props}/>);
    },
    th: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<th className={cn("px-4 py-2 text-left font-bold [&:nth-child(2)]:col-span-2", className)} {...props}/>);
    },
    td: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<td className={cn("flex items-center gap-2 px-4 py-2 text-left [&:nth-child(2)]:col-span-2", className)} {...props}/>);
    },
    // START - Code Syntax Highlighter
    figure: (_a) => {
        var _b, _c;
        var { children, className } = _a, props = __rest(_a, ["children", "className"]);
        const [showCopyButton, setShowCopyButton] = useState(false);
        const figureRef = useRef(null);
        useEffect(() => {
            var _a;
            if (!((_a = figureRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("figcaption"))) {
                setShowCopyButton(true);
            }
        }, [figureRef.current]);
        return (<figure ref={figureRef} className={cn("group bg-background relative my-4 max-h-[400px] w-full overflow-auto rounded-2xl border shadow-sm **:data-line:px-[20px] dark:bg-neutral-900 [&_code]:rounded-none [&_code]:border-none [&_code]:bg-transparent! [&_code]:px-0 [&_code]:py-[20px] [&_code]:text-[13px]")} {...props}>
        {showCopyButton && (<CopyButton value={((_c = (_b = figureRef.current) === null || _b === void 0 ? void 0 : _b.querySelector("pre")) === null || _c === void 0 ? void 0 : _c.textContent) || ""} className="sticky top-2 right-2 left-2 mb-[-32px] ml-auto hidden group-hover:flex"/>)}

        {children}
      </figure>);
    },
    figcaption: (_a) => {
        var _b, _c;
        var { className, children } = _a, props = __rest(_a, ["className", "children"]);
        const copyTextRef = useRef(null);
        const [_, setIsMounted] = useState(false);
        useEffect(() => {
            if (copyTextRef.current) {
                setIsMounted(true);
            }
        }, []);
        return (<figcaption ref={copyTextRef} className="sticky top-0 left-0 flex h-[48px] items-center gap-2 border-b bg-inherit pr-3 pl-4 text-[13px]" {...props}>
        <TechIcons 
        // @ts-ignore
        name={props["data-language"]} className=""/>
        <span className="inline-block grow">
          <button onClick={() => {
                var _a, _b;
                return navigator.clipboard.writeText((_b = (_a = copyTextRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("span")) === null || _b === void 0 ? void 0 : _b.textContent);
            }} className="hover:opacity-80 active:scale-95" title="Copy">
            {children}
          </button>
        </span>
        {copyTextRef.current && (<CopyButton value={((_c = (_b = copyTextRef.current) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.textContent) || ""}/>)}
      </figcaption>);
    },
    pre: (_a) => {
        var { className } = _a, props = __rest(_a, ["className"]);
        return (<>
        <pre {...props}/>
      </>);
    },
    // END - Code Syntax Highlighter
    a: (_a) => {
        var { className, href } = _a, props = __rest(_a, ["className", "href"]);
        return (<Link href={href} target={typeof href === "string" && href.startsWith("https")
                ? "_blank"
                : undefined} className={cn("text-primary hover:text-primary-hover font-medium", className)} {...props}/>);
    },
    img: (_a) => {
        var { className, alt } = _a, props = __rest(_a, ["className", "alt"]);
        return (<Image className={cn("my-8 rounded-md", className)} width={800} height={800} alt={alt} {...props}/>);
    },
    Preview: ComponentPreview,
    Tabs: Tabs,
    Tab: Tab,
    UsedComponents,
    ProtectSection,
    Video: (_a) => {
        var { className, placeholder } = _a, props = __rest(_a, ["className", "placeholder"]);
        const [isPlaying, setIsPlaying] = useState(false);
        const videoRef = useRef(null);
        useEffect(() => {
            if (videoRef.current) {
                if (isPlaying) {
                    videoRef.current.play();
                }
                else {
                    videoRef.current.pause();
                }
            }
        }, [isPlaying]);
        return (<div className="my-8">
        <div className="relative aspect-[4/3] cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
          <video ref={videoRef} className={cn("block rounded-2xl border", className)} playsInline muted loop onClick={() => setIsPlaying(!isPlaying)} {...props}/>

          <AnimatePresence>
            {!isPlaying && (<motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-contrast-higher/10 text-contrast-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 backdrop-blur-md" onClick={() => setIsPlaying(!isPlaying)}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="size-8 translate-x-px">
                  <path d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440z"></path>
                </svg>
              </motion.button>)}
          </AnimatePresence>
        </div>

        {placeholder && (<p className="text-contrast-medium mt-2 px-4 text-sm">
            {placeholder}
          </p>)}
      </div>);
    },
};
export function Mdx({ code }) {
    const Component = useMDXComponent(code);
    const router = useRouter();
    const pathname = usePathname();
    return (<>
      <Component components={components}/>
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => {
            const currentDoc = sortMotionBySlug(allDocuments).findIndex((doc) => doc.slug === pathname);
            if (currentDoc > 0) {
                router.push(sortMotionBySlug(allDocuments)[currentDoc - 1].slug);
            }
        }} disabled={sortMotionBySlug(allDocuments).findIndex((doc) => doc.slug === pathname) === 0 || pathname === "/"}>
          ← Previous
        </Button>

        <Button variant="outline" onClick={() => {
            if (pathname === "/") {
                router.push(sortMotionBySlug(allDocuments)[1].slug);
                return;
            }
            const currentDoc = sortMotionBySlug(allDocuments).findIndex((doc) => doc.slug === pathname);
            if (currentDoc < sortMotionBySlug(allDocuments).length - 1) {
                router.push(sortMotionBySlug(allDocuments)[currentDoc + 1].slug);
            }
        }} disabled={sortMotionBySlug(allDocuments).findIndex((doc) => doc.slug === pathname) ===
            sortMotionBySlug(allDocuments).length - 1}>
          Next →
        </Button>
      </div>
    </>);
}
