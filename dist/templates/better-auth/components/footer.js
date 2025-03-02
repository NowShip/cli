"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Logo from "./logo";
import { SwitchTheme } from "./switch-theme";
export default function Footer() {
    const pathname = usePathname();
    const hideNavbar = pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname === "/message/account" ||
        pathname === "/testimonial";
    if (hideNavbar) {
        return null;
    }
    return (<footer className="bg-gray-light flex flex-col items-center justify-center gap-7.5 px-6 py-15">
      <div className="flex flex-col items-center justify-center">
        <Link href="/">
          <Logo />
        </Link>
        <p className="my-2.5 text-center text-xs">
          Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in,
          <br className="hidden md:block"/>
          elit. Integer tempor.
        </p>
        <div className="flex items-center justify-center py-5">
          <a href="#" className="link">
            <Facebook />
          </a>
          <a href="#" className="link">
            <Instagram />
          </a>
          <a href="#" className="link">
            <Twitter />
          </a>
          <a href="#" className="link">
            <Mail />
          </a>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-2 border-y py-4 md:flex-row md:items-center md:gap-9.5 md:border-none md:py-0">
        <Link href="/privacy" className="link text-xs">
          Privacy Policy
        </Link>
        <Link href="/terms" className="link text-xs">
          Terms & Conditions
        </Link>
        <Link href="/cookie" className="link text-xs">
          Cookie Policy
        </Link>
      </div>

      <p className="text-xs">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>

      <SwitchTheme />
    </footer>);
}
