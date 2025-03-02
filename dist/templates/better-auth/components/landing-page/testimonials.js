"use client";
import React from "react";
import Content from "../ui/content";
import { useGetTestimonialsQuery } from "@/lib/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function Testimonials() {
    var _a;
    const testimonialsQuery = useGetTestimonialsQuery();
    const publicTestimonials = (_a = testimonialsQuery.data) === null || _a === void 0 ? void 0 : _a.filter((testimonial) => testimonial.public);
    if ((publicTestimonials === null || publicTestimonials === void 0 ? void 0 : publicTestimonials.length) === 0) {
        return null;
    }
    return (<div className="bg-background py-24">
      <Content>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Testimonials
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-6xl dark:text-neutral-50">
            What our customers say
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {publicTestimonials === null || publicTestimonials === void 0 ? void 0 : publicTestimonials.map((testimonial) => (<div key={testimonial.id} className="flex flex-col justify-between rounded-2xl bg-white p-6 ring-1 shadow-lg ring-neutral-900/10 dark:bg-neutral-800 dark:ring-white/10">
              <blockquote className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                &quot;{testimonial.content}&quot;
              </blockquote>

              <div className="mt-6 flex items-center gap-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.image || ""}/>
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>))}
        </div>
      </Content>
    </div>);
}
