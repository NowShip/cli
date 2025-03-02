import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function NotFound() {
    return (<div className="from-light-50 to-light-100 flex min-h-screen items-center justify-center bg-linear-to-br px-4">
      <div className="text-center">
        <h1 className="animate-fade-in mb-4 text-6xl font-bold">404</h1>
        <div className="animate-float mx-auto mb-6 h-24 w-24">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 14H11V12H13V14ZM13 10H11V8H13V10ZM13 18H11V16H13V18ZM21 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H21C22.1 20 23 19.1 23 18V6C23 4.9 22.1 4 21 4ZM21 18H3V6H21V18Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="animate-fade-in mb-4 text-2xl font-semibold">
          Oops! Page not found
        </p>
        <p className="animate-fade-in text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" className="rounded-full">
          <ArrowLeft className="mr-2" size={20}/>
          Go back home
        </Button>
      </div>
    </div>);
}
