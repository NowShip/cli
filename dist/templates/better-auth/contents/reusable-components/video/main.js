var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Download, Gauge, PictureInPicture } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
const UPDATE_INTERVAL = 50;
const DURATION_OF_HIDE_CONTROLS = 1000;
const INTERVAL_OF_SHADOW = 100; // 100 Recommended
const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const VideoPlayContext = React.createContext(undefined);
const VideoMuteContext = React.createContext(undefined);
const VideoFullscreenContext = React.createContext(undefined);
const VideoInfoContext = React.createContext(undefined);
const VideoControlsOptionContext = React.createContext(undefined);
const Video = React.memo((_a) => {
    var { aspectRatio, className, children, muted = false, controls = false, controlsOption = [], getDuration, getCurrentTime, autoPlay = false, playing = false } = _a, props = __rest(_a, ["aspectRatio", "className", "children", "muted", "controls", "controlsOption", "getDuration", "getCurrentTime", "autoPlay", "playing"]);
    const [isPlaying, setIsPlaying] = React.useState(playing);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [hideControls, setHideControls] = React.useState(false);
    const [_, setError] = React.useState(null);
    const containerRef = React.useRef(null);
    const videoRef = React.useRef(null);
    const hideControlsTimeout = React.useRef(null);
    const togglePlay = React.useCallback(() => {
        if (!videoRef.current)
            return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
            hideControlsTimeout.current = setTimeout(() => {
                setHideControls(true);
            }, DURATION_OF_HIDE_CONTROLS);
        }
        else {
            videoRef.current.pause();
            setIsPlaying(false);
            setHideControls(false);
            if (hideControlsTimeout.current) {
                clearTimeout(hideControlsTimeout.current);
            }
        }
        setHideControls(false);
    }, []);
    const toggleMute = React.useCallback(() => {
        if (!videoRef.current)
            return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
    }, [isMuted]);
    const toggleFullscreen = React.useCallback(() => {
        if (!containerRef.current)
            return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);
    const playContextValue = React.useMemo(() => ({
        isPlaying,
        togglePlay,
    }), [isPlaying, togglePlay]);
    const muteContextValue = React.useMemo(() => ({
        isMuted,
        toggleMute,
    }), [isMuted, toggleMute]);
    const fullscreenContextValue = React.useMemo(() => ({
        isFullscreen,
        toggleFullscreen,
    }), [isFullscreen, toggleFullscreen]);
    const infoContextValue = React.useMemo(() => ({
        duration,
        hideControls,
    }), [duration, hideControls]);
    const controlsOptionContextValue = React.useMemo(() => ({
        controlsOption,
    }), [controlsOption]);
    const handleMouseMove = React.useCallback(() => {
        if (!isPlaying)
            return;
        setHideControls(false);
        if (hideControlsTimeout.current) {
            clearTimeout(hideControlsTimeout.current);
        }
        hideControlsTimeout.current = setTimeout(() => {
            setHideControls(true);
        }, DURATION_OF_HIDE_CONTROLS);
    }, [isPlaying]);
    React.useEffect(() => {
        setIsMuted(muted);
    }, [muted]);
    React.useEffect(() => {
        const video = videoRef.current;
        if (!video)
            return;
        if (playing) {
            video.play();
        }
        else {
            video.pause();
        }
    }, [playing]);
    React.useEffect(() => {
        return () => {
            if (hideControlsTimeout.current) {
                clearTimeout(hideControlsTimeout.current);
            }
        };
    }, []);
    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);
    React.useEffect(() => {
        if (videoRef.current && getCurrentTime && isPlaying) {
            const interval = setInterval(() => {
                var _a, _b, _c;
                getCurrentTime === null || getCurrentTime === void 0 ? void 0 : getCurrentTime({
                    value: ((_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.currentTime) || 0,
                    percentage: Number((((((_b = videoRef.current) === null || _b === void 0 ? void 0 : _b.currentTime) || 0) /
                        (((_c = videoRef.current) === null || _c === void 0 ? void 0 : _c.duration) || 0)) *
                        100).toFixed(2)),
                });
            }, UPDATE_INTERVAL);
            return () => clearInterval(interval);
        }
    }, [getCurrentTime, isPlaying]);
    console.log({ autoPlay });
    React.useEffect(() => {
        if (!videoRef.current || (autoPlay && muted) || autoPlay !== "force")
            return;
        const playVideo = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                yield ((_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.play());
            }
            catch (error) {
                // If autoplay fails, try muting and playing again
                if (error instanceof Error && error.name === "NotAllowedError") {
                    setError("Autoplay requires muted audio. Muting and retrying...");
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        setIsMuted(true);
                        try {
                            yield videoRef.current.play();
                        }
                        catch (retryError) {
                            setError("Failed to autoplay video");
                        }
                    }
                }
                else {
                    setError("Video playback error");
                }
            }
        });
        playVideo();
    }, [autoPlay]);
    return (<VideoInfoContext.Provider value={infoContextValue}>
        <VideoPlayContext.Provider value={playContextValue}>
          <VideoMuteContext.Provider value={muteContextValue}>
            <VideoFullscreenContext.Provider value={fullscreenContextValue}>
              <VideoControlsOptionContext.Provider value={controlsOptionContextValue}>
                <div ref={containerRef} data-video-container className={cn("group relative isolate w-full min-w-70 overflow-hidden", hideControls && "cursor-none", isFullscreen && "!rounded-none bg-white", className)} style={{ aspectRatio }}>
                  <video ref={videoRef} className={cn("relative -z-20 h-full w-full object-cover", isFullscreen && "mx-auto max-h-full w-auto max-w-full")} data-slider autoPlay={autoPlay === "on-visible"
            ? undefined
            : autoPlay === "force"
                ? true
                : autoPlay} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onLoadedMetadata={() => {
            var _a, _b;
            setDuration(((_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.duration) || 0);
            getDuration === null || getDuration === void 0 ? void 0 : getDuration(((_b = videoRef.current) === null || _b === void 0 ? void 0 : _b.duration) || 0);
        }} muted={muted} {...props}/>
                  <div className="div-video absolute inset-0 -z-10 bg-black/50" onClick={() => {
            if (controls) {
                togglePlay();
            }
        }} onMouseMove={handleMouseMove} onMouseLeave={() => {
            setHideControls(false);
            if (hideControlsTimeout.current) {
                clearTimeout(hideControlsTimeout.current);
            }
        }}/>
                  {controls ? (<VideoHide className="pointer-events-none absolute right-0 bottom-0 left-0 isolate flex flex-col gap-2 p-4 text-white delay-500 duration-200 *:pointer-events-auto group-hover:opacity-100 group-hover:delay-0 data-[active=true]:translate-y-full data-[playing=true]:opacity-0 group-hover:data-[playing=true]:opacity-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <VideoPlay />
                          <VideoTime />
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                          <VideoMute />
                          <VideoFullscreen className="translate-x-0.5"/>
                          <VideoOptions />
                        </div>
                      </div>
                      <VideoSlider />
                      <div className="!pointer-events-none absolute right-0 bottom-0 left-0 -z-10 h-30 bg-linear-to-t from-black to-transparent"></div>
                    </VideoHide>) : null}

                  {children}
                </div>
              </VideoControlsOptionContext.Provider>
            </VideoFullscreenContext.Provider>
          </VideoMuteContext.Provider>
        </VideoPlayContext.Provider>
      </VideoInfoContext.Provider>);
});
Video.displayName = "Video";
const VideoHide = React.memo((_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    const { hideControls } = useVideoInfo();
    const { isPlaying } = useVideoPlay();
    return (<div data-active={hideControls} data-playing={isPlaying} className={cn("", className)} {...props}>
        {children}
      </div>);
});
VideoHide.displayName = "VideoHide";
const VideoPlay = React.memo((_a) => {
    var { className, asChild } = _a, props = __rest(_a, ["className", "asChild"]);
    const { togglePlay, isPlaying } = useVideoPlay();
    const Comp = asChild ? Slot : "button";
    return (<Comp className={cn("duration-150 hover:opacity-80 active:scale-90", className)} onClick={togglePlay} {...props}>
        {isPlaying ? icons.pause : icons.play}
      </Comp>);
});
VideoPlay.displayName = "VideoPlay";
const VideoMute = React.memo((_a) => {
    var { className, asChild } = _a, props = __rest(_a, ["className", "asChild"]);
    const { isMuted, toggleMute } = useVideoMute();
    const Comp = asChild ? Slot : "button";
    return (<Comp className={cn("flex size-6 items-center justify-center duration-150 hover:opacity-80 active:scale-90", className)} onClick={toggleMute} {...props}>
        {isMuted ? icons.volumeOff : icons.volume}
      </Comp>);
});
VideoMute.displayName = "VideoMute";
const VideoFullscreen = React.memo((_a) => {
    var { className, asChild } = _a, props = __rest(_a, ["className", "asChild"]);
    const { isFullscreen, toggleFullscreen } = useVideoFullscreen();
    const Comp = asChild ? Slot : "button";
    return (<Comp className={cn("flex size-6 items-center justify-center duration-150 hover:opacity-80 active:scale-90", className)} onClick={toggleFullscreen} {...props}>
        {isFullscreen ? icons.fullscreen : icons.fullscreen}
      </Comp>);
});
VideoFullscreen.displayName = "VideoFullscreen";
const VideoSlider = React.memo((_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const { duration } = useVideoInfo();
    const [currentTime, setCurrentTime] = React.useState(0);
    const sliderRef = React.useRef(null);
    React.useEffect(() => {
        var _a, _b;
        const video = (_b = (_a = sliderRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
        if (!video)
            return;
        const interval = setInterval(() => {
            setCurrentTime(video.currentTime);
        }, UPDATE_INTERVAL);
        return () => clearInterval(interval);
    }, []);
    return (<SliderPrimitive.Root ref={sliderRef} className={cn("relative flex w-full touch-none items-center select-none", className)} min={0} max={duration} step={0.001} value={[currentTime]} onValueChange={(value) => {
            var _a, _b;
            const video = (_b = (_a = sliderRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
            if (!video)
                return;
            if (video) {
                video.pause();
                video.currentTime = value[0];
            }
        }} onPointerUp={() => {
            var _a, _b;
            const video = (_b = (_a = sliderRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
            if (!video)
                return;
            if (video) {
                video.play();
            }
        }} {...props}>
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/30">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-white"/>
        </SliderPrimitive.Track>
        {/* <SliderPrimitive.Thumb className="bg-background block h-4 w-4 rounded-full border border-white/50 shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" /> */}
      </SliderPrimitive.Root>);
});
VideoSlider.displayName = "VideoSlider";
const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
const VideoTime = React.memo((_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const { duration } = useVideoInfo();
    return (<div className={cn("text-xs tabular-nums", className)} {...props}>
        <VideoCurrentTime /> / {formatTime(duration)}
      </div>);
});
VideoTime.displayName = "VideoTime";
const VideoCurrentTime = React.memo(() => {
    const [currentTime, setCurrentTime] = React.useState(0);
    const timeRef = React.useRef(null);
    React.useEffect(() => {
        var _a, _b;
        const video = (_b = (_a = timeRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
        if (!video)
            return;
        const interval = setInterval(() => {
            setCurrentTime(video.currentTime);
        }, UPDATE_INTERVAL);
        return () => clearInterval(interval);
    }, []);
    return <span ref={timeRef}>{formatTime(currentTime)}</span>;
});
VideoCurrentTime.displayName = "VideoCurrentTime";
const VideoOptions = React.memo(() => {
    const { controlsOption } = useVideoControlsOption();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSpeedOpen, setIsSpeedOpen] = React.useState(false);
    const optionsRef = React.useRef(null);
    React.useEffect(() => {
        const listener = (event) => __awaiter(void 0, void 0, void 0, function* () {
            if (!optionsRef.current ||
                optionsRef.current.contains(event.target)) {
                return;
            }
            const divs = optionsRef.current.querySelectorAll("[data-animate]");
            divs.forEach((div) => {
                div.style.opacity = "0";
                div.style.scale = "0";
                div.style.transition = "0.2s ease-in-out";
            });
            yield new Promise((resolve) => setTimeout(resolve, 200));
            setIsOpen(false);
            setIsSpeedOpen(false);
        });
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);
    if (controlsOption.includes("nodownload") &&
        controlsOption.includes("noplaybackrate") &&
        controlsOption.includes("nopictureinpicture")) {
        return null;
    }
    const onDownload = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const video = (_b = (_a = optionsRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
        if (!video)
            return;
        try {
            const response = yield fetch(video.src);
            const blob = yield response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = video.src.split("/").pop() || "video";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error("Error downloading video:", error);
        }
        setIsOpen(false);
    });
    const onPictureInPicture = () => {
        var _a, _b;
        const video = (_b = (_a = optionsRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
        if (!video)
            return;
        video.requestPictureInPicture();
        setIsOpen(false);
    };
    const onPlaybackRate = () => {
        if (optionsRef.current) {
            const options = optionsRef.current.querySelector("[data-animate]");
            options.style.opacity = ".9";
            options.style.transform = "translateY(-32px) scale(0.9)";
            options.style.transition = "0.2s ease-in-out";
            setIsSpeedOpen(true);
        }
    };
    const onSpeedChange = (speed) => {
        var _a, _b;
        const video = (_b = (_a = optionsRef.current) === null || _a === void 0 ? void 0 : _a.closest("[data-video-container]")) === null || _b === void 0 ? void 0 : _b.querySelector("video");
        if (!video)
            return;
        video.playbackRate = speed;
        setIsSpeedOpen(false);
        setIsOpen(false);
    };
    const onBack = () => __awaiter(void 0, void 0, void 0, function* () {
        if (optionsRef.current) {
            const speed = optionsRef.current.querySelector("[data-animate='speed']");
            const options = optionsRef.current.querySelector("[data-animate]");
            speed.style.opacity = "0";
            speed.style.transform = "translateY(12px)";
            speed.style.transition = "0.2s ease-in-out";
            options.style.opacity = "1";
            options.style.transform = "translateY(0)";
            options.style.transition = "0.2s ease-in-out";
            yield new Promise((resolve) => setTimeout(resolve, 200));
            setIsSpeedOpen(false);
        }
    });
    return (<div ref={optionsRef} className="relative flex items-center justify-center">
      <button className="flex size-6 items-center justify-center duration-150 hover:opacity-80 active:scale-90" onClick={() => setIsOpen(!isOpen)}>
        {icons.dots}
      </button>

      {isOpen && (<>
          <div data-animate className="absolute right-0 bottom-0 w-45 min-w-full rounded-lg bg-white duration-200">
            {!controlsOption.includes("nodownload") && (<button className="flex h-9 items-center gap-2 px-2 text-sm text-neutral-700" onClick={onDownload}>
                <Download size={20}/>
                Download
              </button>)}
            {!controlsOption.includes("noplaybackrate") && (<button className="flex h-9 items-center gap-2 px-2 text-sm text-neutral-700" onClick={onPlaybackRate}>
                <Gauge size={20}/>
                Playback speed
              </button>)}
            {!controlsOption.includes("nopictureinpicture") && (<button className="flex h-9 items-center gap-2 px-2 text-sm text-neutral-700" onClick={onPictureInPicture}>
                <PictureInPicture size={20}/>
                Picture in Picture
              </button>)}
          </div>

          {isSpeedOpen && (<div data-animate="speed" className={cn("no-scrollbar animate-video-options-speed absolute right-0 bottom-0 max-h-32 w-45 min-w-full origin-bottom-right overflow-auto rounded-lg bg-white transition-transform duration-200")}>
              <button className="flex h-9 items-center gap-2 px-2 text-sm text-neutral-700" onClick={onBack}>
                Options
              </button>
              {SPEED_OPTIONS.map((speed) => (<button key={speed} className="flex h-9 items-center gap-2 px-2 text-sm text-neutral-700" onClick={() => onSpeedChange(speed)}>
                  {speed}
                </button>))}
            </div>)}
        </>)}
    </div>);
});
VideoOptions.displayName = "VideoOptions";
const VideoShadow = React.memo((_a) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const [src, setSrc] = React.useState("");
    const containerRef = React.useRef(null);
    const videoRef = React.useRef(null);
    React.useEffect(() => {
        var _a;
        const video = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("video");
        if (!video)
            return;
        setSrc(video.src);
    }, []);
    React.useEffect(() => {
        var _a;
        const mainVideo = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("video");
        if (!mainVideo)
            return;
        const interval = setInterval(() => {
            if (!videoRef.current)
                return;
            videoRef.current.currentTime = mainVideo.currentTime;
        }, INTERVAL_OF_SHADOW);
        return () => clearInterval(interval);
    }, []);
    return (<div ref={containerRef} className={cn("relative isolate w-full", className)} {...props}>
        {children}

        <div className="pointer-events-none absolute inset-0 -z-10 translate-y-1 blur-xl">
          <video ref={videoRef} src={src} playsInline muted className="h-full w-full object-cover"/>
        </div>
      </div>);
});
VideoShadow.displayName = "VideoShadow";
// React Context Hooks
const useVideoPlay = () => {
    const context = React.useContext(VideoPlayContext);
    if (!context) {
        throw new Error("useVideoPlay was used outside of its Provider");
    }
    return context;
};
const useVideoMute = () => {
    const context = React.useContext(VideoMuteContext);
    if (!context) {
        throw new Error("useVideoMute must be used within a Video component");
    }
    return context;
};
const useVideoFullscreen = () => {
    const context = React.useContext(VideoFullscreenContext);
    if (!context) {
        throw new Error("useVideoFullscreen must be used within a Video component");
    }
    return context;
};
const useVideoInfo = () => {
    const context = React.useContext(VideoInfoContext);
    if (!context) {
        throw new Error("useVideoInfo must be used within a Video component");
    }
    return context;
};
const useVideoControlsOption = () => {
    const context = React.useContext(VideoControlsOptionContext);
    if (!context) {
        throw new Error("useVideoControlsOption must be used within a Video component");
    }
    return context;
};
// Icons
const icons = {
    play: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 5.7475C6 4.56075 7.31287 3.84399 8.31114 4.48573L18.0372 10.7382C18.9557 11.3287 18.9557 12.6713 18.0373 13.2618L8.31114 19.5143C7.31287 20.156 6 19.4393 6 18.2525V5.7475Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
    pause: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 4H15C14.4477 4 14 4.44772 14 5V19C14 19.5523 14.4477 20 15 20H17C17.5523 20 18 19.5523 18 19V5C18 4.44772 17.5523 4 17 4Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H9C9.55228 20 10 19.5523 10 19V5C10 4.44772 9.55228 4 9 4Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
    volume: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.16675 3.91832C9.16658 3.80224 9.13203 3.68882 9.06747 3.59236C9.0029 3.49591 8.91121 3.42074 8.80396 3.37634C8.69671 3.33194 8.57872 3.32031 8.46487 3.34291C8.35101 3.36551 8.24641 3.42132 8.16425 3.50332L5.34425 6.32248C5.23542 6.43196 5.10594 6.51876 4.96333 6.57784C4.82071 6.63691 4.66778 6.6671 4.51341 6.66665H2.50008C2.27907 6.66665 2.06711 6.75445 1.91083 6.91073C1.75455 7.06701 1.66675 7.27897 1.66675 7.49998V12.5C1.66675 12.721 1.75455 12.933 1.91083 13.0892C2.06711 13.2455 2.27907 13.3333 2.50008 13.3333H4.51341C4.66778 13.3329 4.82071 13.3631 4.96333 13.4221C5.10594 13.4812 5.23542 13.568 5.34425 13.6775L8.16341 16.4975C8.24558 16.5798 8.35034 16.6359 8.46441 16.6586C8.57848 16.6814 8.69673 16.6697 8.80419 16.6252C8.91164 16.5807 9.00345 16.5052 9.068 16.4085C9.13254 16.3117 9.16691 16.198 9.16675 16.0816V3.91832Z" fill="currentColor" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 7.5C13.8742 8.22123 14.1666 9.09846 14.1666 10C14.1666 10.9015 13.8742 11.7788 13.3333 12.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1367 15.3033C16.8332 14.6069 17.3856 13.7801 17.7625 12.8701C18.1395 11.9602 18.3335 10.9849 18.3335 9.99999C18.3335 9.01507 18.1395 8.03979 17.7625 7.12984C17.3856 6.21989 16.8332 5.3931 16.1367 4.69666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
    volumeOff: (<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6667 6C11.003 6.44823 11.2208 6.97398 11.3001 7.52867" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.9094 3.75732C13.7621 4.6095 14.3383 5.69876 14.5629 6.88315C14.7875 8.06754 14.6502 9.29213 14.1688 10.3973" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 1L14.3333 14.3333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66659 4.66669L4.27525 5.05802C4.18819 5.1456 4.08461 5.21504 3.97051 5.2623C3.85642 5.30957 3.73408 5.33372 3.61059 5.33335H1.99992C1.82311 5.33335 1.65354 5.40359 1.52851 5.52862C1.40349 5.65364 1.33325 5.82321 1.33325 6.00002V10C1.33325 10.1768 1.40349 10.3464 1.52851 10.4714C1.65354 10.5964 1.82311 10.6667 1.99992 10.6667H3.61059C3.73408 10.6663 3.85642 10.6905 3.97051 10.7377C4.08461 10.785 4.18819 10.8544 4.27525 10.942L6.53059 13.198C6.59632 13.2639 6.68012 13.3088 6.77138 13.3269C6.86264 13.3451 6.95724 13.3358 7.0432 13.3002C7.12916 13.2646 7.20262 13.2042 7.25425 13.1268C7.30589 13.0494 7.33338 12.9584 7.33325 12.8654V7.33335" fill="currentColor"/>
      <path d="M4.66659 4.66669L4.27525 5.05802C4.18819 5.1456 4.08461 5.21504 3.97051 5.2623C3.85642 5.30957 3.73408 5.33372 3.61059 5.33335H1.99992C1.82311 5.33335 1.65354 5.40359 1.52851 5.52862C1.40349 5.65364 1.33325 5.82321 1.33325 6.00002V10C1.33325 10.1768 1.40349 10.3464 1.52851 10.4714C1.65354 10.5964 1.82311 10.6667 1.99992 10.6667H3.61059C3.73408 10.6663 3.85642 10.6905 3.97051 10.7377C4.08461 10.785 4.18819 10.8544 4.27525 10.942L6.53059 13.198C6.59632 13.2639 6.68012 13.3088 6.77138 13.3269C6.86264 13.3451 6.95724 13.3358 7.0432 13.3002C7.12916 13.2646 7.20262 13.2042 7.25425 13.1268C7.30589 13.0494 7.33338 12.9584 7.33325 12.8654V7.33335" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.552 2.78136C6.61593 2.71719 6.69746 2.67345 6.78628 2.65568C6.87509 2.63791 6.96718 2.64691 7.05088 2.68154C7.13457 2.71618 7.20609 2.77488 7.25638 2.85022C7.30666 2.92555 7.33345 3.01412 7.33334 3.10469V3.56202" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
    fullscreen: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66667 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V6.66667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.4999 6.66667V4.16667C17.4999 3.72464 17.3243 3.30072 17.0118 2.98816C16.6992 2.67559 16.2753 2.5 15.8333 2.5H13.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 13.3333V15.8333C2.5 16.2753 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H6.66667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 17.5H15.8333C16.2753 17.5 16.6992 17.3244 17.0118 17.0118C17.3243 16.6993 17.4999 16.2753 17.4999 15.8333V13.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
    dots: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0001 10.8334C10.4603 10.8334 10.8334 10.4603 10.8334 10C10.8334 9.53978 10.4603 9.16669 10.0001 9.16669C9.53984 9.16669 9.16675 9.53978 9.16675 10C9.16675 10.4603 9.53984 10.8334 10.0001 10.8334Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.0001 4.99998C10.4603 4.99998 10.8334 4.62688 10.8334 4.16665C10.8334 3.70641 10.4603 3.33331 10.0001 3.33331C9.53984 3.33331 9.16675 3.70641 9.16675 4.16665C9.16675 4.62688 9.53984 4.99998 10.0001 4.99998Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.0001 16.6667C10.4603 16.6667 10.8334 16.2936 10.8334 15.8333C10.8334 15.3731 10.4603 15 10.0001 15C9.53984 15 9.16675 15.3731 9.16675 15.8333C9.16675 16.2936 9.53984 16.6667 10.0001 16.6667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
};
export { Video, VideoHide, VideoPlay, VideoSlider, VideoShadow };
