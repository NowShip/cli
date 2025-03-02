import React from "react";
import Logo from "./logo";

export default function LoadingPage() {
  return (
    <div className="flex h-dvh animate-pulse flex-col items-center justify-center">
      <Logo />
    </div>
  );
}
