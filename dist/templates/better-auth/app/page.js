"use client";
import React from "react";
import { CheckCircle, Guitar, Layers, Palette } from "lucide-react";
import Link from "next/link";
import Content from "@/components/ui/content";
import { allAnimations, allReusableComponents, } from "@/.contentlayer/generated";
import { sortMotionBySlug } from "@/lib/utils";
import CTA from "@/components/cta";
import Image from "next/image";
export default function Homepage() {
    return (<Content>
      <h1 className="mb-4 text-2xl font-bold">Animation & Component Library</h1>
      <p className="text-muted text-lg leading-relaxed">
        Hey there! 👋 I&apos;ve put together this collection of polished
        animations and React components for you to use. Every example might
        include key points and video demonstrations of the component. Whether
        you&apos;re crafting beautiful interfaces or just exploring cool
        animations, I&apos;ve got some great, proven solutions ready for you to
        use.
      </p>

      <div className="my-8 flex w-fit flex-col gap-2 rounded-lg border px-4 py-3 shadow-sm backdrop-blur md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-2">
          <Layers size={16}/>
          <p className="text-muted text-sm font-medium">Built with React.js</p>
        </div>
        <div className="bg-contrast-higher/10 h-px w-full md:h-4 md:w-px"/>
        <div className="flex items-center gap-2">
          <Palette size={16}/>
          <p className="text-muted text-sm font-medium">Styled with Tailwind</p>
        </div>
        <div className="bg-contrast-higher/10 h-px w-full md:h-4 md:w-px"/>
        <div className="flex items-center gap-2">
          <Guitar size={16}/>
          <p className="text-muted text-sm font-medium">Animated with Motion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sortMotionBySlug(allAnimations).map((motion) => (<Link key={motion._id} href={`${motion.slug}`} className="group overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-4">
              <h3 className="text-lg font-medium">{motion.title}</h3>
              <p className="text-muted line-clamp-1 text-sm">
                {motion.description}
              </p>
            </div>
            <div className="bg-background aspect-4/3">
              <video src={motion.video} autoPlay muted loop playsInline/>
            </div>
          </Link>))}
      </div>

      <div className="mt-12">
        <h2 className="mb-8 text-xl">Reusable Components</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {allReusableComponents.map((motion) => (<Link key={motion._id} href={`${motion.slug}`} className="group bg-background rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-4">
                <h3 className="text-lg font-medium">{motion.title}</h3>
                <p className="text-muted line-clamp-1 text-sm">
                  {motion.description}
                </p>
              </div>
            </Link>))}
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-xl">What you expect?</h2>
        <ul className="mt-4 space-y-2 pl-4">
          <li className="flex items-center gap-2">
            <CheckCircle size={16}/>
            <p>You get the code for the component.</p>
          </li>
          <li>
            <span className="flex items-center gap-2">
              <CheckCircle size={16}/>
              <span>
                You get the code of those components that were used in the
                component.
              </span>
            </span>
            <Image src="https://vztpjn0djt.ufs.sh/f/RAHCy45jEyblXc4H2XuUhWzB7osHN9QI2eSyxcK5Cbntr4Rd" alt="code" width={700} height={500} className="mt-4 w-full rounded-2xl border"/>
          </li>
          <li>
            <span className="flex items-center gap-2">
              <CheckCircle size={16}/>
              <span>
                You get all the key points of the component and sometimes you
                might get videos demonstrations of issues with the component.
              </span>
            </span>
            <div className="grid grid-cols-2 gap-4">
              <Image src="https://vztpjn0djt.ufs.sh/f/RAHCy45jEyblAKrEXwAWnwPu9qoySDWO51eG3Uzhf6c2bjvN" alt="code" width={700} height={500} className="mt-4 w-full rounded-2xl border"/>
              <Image src="https://vztpjn0djt.ufs.sh/f/RAHCy45jEyblTjvG1xkVcSk9xCE6vmYKByetqajiVO07pnNg" alt="code" width={700} height={500} className="mt-4 w-full rounded-2xl border"/>
            </div>
          </li>
        </ul>
      </div>

      <CTA description="" showButton={false}/>
    </Content>);
}
