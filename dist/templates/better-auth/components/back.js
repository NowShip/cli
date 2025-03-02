import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
export default function Back({ href, label = "Home" }) {
    return (<div className="mb-4 flex w-full items-start">
      <Button href={href} variant={"ghost"} size={"xs"} className="gap-1 rounded-full">
        <ArrowLeftIcon className="size-4"/>
        {label}
      </Button>
    </div>);
}
