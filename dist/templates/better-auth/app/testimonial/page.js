"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetSessionQuery, useSendTestimonialMutation, } from "@/lib/endpoints";
import { Input } from "@/components/ui/input";
export default function Testimonial() {
    const { data: session } = useGetSessionQuery();
    const { mutate: sendTestimonial, isPending, isSuccess, } = useSendTestimonialMutation();
    return (<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative mx-auto flex w-full max-w-xl flex-col justify-center px-8 py-12">
        <div className="from-background/10 via-background/50 to-background/10 absolute top-0 left-0 -z-10 h-full w-full bg-linear-to-b backdrop-blur-xs"/>
        {!isSuccess ? (<form onSubmit={(e) => {
                var _a, _b, _c;
                e.preventDefault();
                const formData = new FormData(e.target);
                const message = formData.get("message");
                sendTestimonial({
                    message,
                    email: ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email) || "a@alisamadii.com",
                    name: ((_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.name) || "",
                    position: formData.get("position"),
                    image: ((_c = session === null || session === void 0 ? void 0 : session.user) === null || _c === void 0 ? void 0 : _c.image) || "",
                });
            }} className="w-full space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Share Your Story
              </h1>
              <p className="text-muted-foreground">
                Your feedback helps us improve and inspires others. Tell us
                about your experience.
              </p>
            </div>
            <Input name="position" placeholder="Position"/>
            <Textarea name="message" placeholder="Write your testimonial here..." className="min-h-[200px] resize-none p-4 text-lg" required/>
            <Button size="lg" className="w-full md:w-auto" disabled={isPending}>
              Submit Testimonial
            </Button>
          </form>) : (<div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Thank You! 🎉</h2>
            <p className="text-muted-foreground">
              We appreciate you taking the time to share your experience.
            </p>
          </div>)}
      </div>
      <div className="hidden h-screen w-full overflow-hidden lg:block">
        <Image src="https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Testimonial background" width={2000} height={2000} priority className="h-full w-full translate-y-[20%] rounded-tl-[100px] object-cover"/>
      </div>
    </div>);
}
