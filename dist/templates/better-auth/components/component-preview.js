"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PREVIEWS } from "@/__registry__";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
export default function ComponentPreview({ name, className, controls = false, }) {
    var _a;
    const [key, setKey] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const Component = (_a = PREVIEWS[name]) === null || _a === void 0 ? void 0 : _a.component;
    const ref = useRef(null);
    useEffect(() => {
        var _a;
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
            }
        };
        if (isFullscreen) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.requestFullscreen();
        }
        else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [isFullscreen]);
    if (!Component) {
        return (<div className="flex min-h-60 items-center justify-center rounded-2xl border p-8 shadow-sm">
        <p>Component not found. Please check the name.</p>
      </div>);
    }
    return (<>
      <div ref={ref} id="preview-container" className={cn("dark:bg-gray/10 relative flex min-h-60 justify-center overflow-hidden rounded-2xl border bg-white p-8 shadow-sm dark:border", isFullscreen && "items-center", className)}>
        {controls && (<Button key={`refresh-${key}`} size={"icon"} variant={"ghost"} onClick={() => setKey((prev) => prev + 1)} className="absolute top-4 right-4">
            <RefreshCw className="animate-spin"/>
          </Button>)}
        <Component key={key}/>
      </div>
      <div className="mx-auto mt-2 w-full px-4">
        <button className="text-sm" onClick={() => {
            setIsFullscreen(!isFullscreen);
        }}>
          maximize
        </button>
      </div>
    </>);
}
