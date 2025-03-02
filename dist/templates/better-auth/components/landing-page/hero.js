"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
export default function Hero() {
    return (<section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            <span className="relative">
              Build Faster
              <span className="bg-primary/20 dark:bg-primary absolute bottom-0 left-0 -z-10 h-4 w-full -translate-y-3"></span>
            </span>
            , Scale Better
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg">
            Launch your next project in minutes with our complete solution for
            modern web applications. Everything you need - auth, payments, and
            beautiful UI components.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("sending");
                const data = yield axios.post("/api/send", {
                    to: "alirs.dev@gmail.com",
                    url: "https://google.com",
                    subject: "Welcome to our platform!",
                    template: "welcome",
                    name: "Ali",
                });
                console.log(data);
                console.log("sent");
            }
            catch (error) {
                console.error(error);
            }
        })}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>);
}
