import React from "react";
import { CircleUserRound, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import appConfig from "@/config/app";
const tabs = appConfig.profiles.tabs.map((tab) => {
    let icon;
    if (tab === "profile") {
        icon = CircleUserRound;
    }
    else if (tab === "security") {
        icon = ShieldCheck;
    }
    else {
        icon = CreditCard;
    }
    return {
        label: tab,
        icon,
    };
});
export default function Sidebar({ activeTab, setActiveTab, onClose }) {
    return (<>
      {tabs.map((tab) => (<Button key={tab.label} variant={activeTab === tab.label ? "default" : "ghost"} size="sm" className={cn("w-full justify-start text-[13px] font-medium")} onClick={() => {
                setActiveTab(tab.label);
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }}>
          <tab.icon />
          <span>{tab.label}</span>
        </Button>))}
    </>);
}
