import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
export default function Cta() {
    return (<section className="relative bg-neutral-900 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-300">
            Join thousands of developers who are already building amazing
            products with our platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" variant="default">
              Start building now
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
            <Button variant="outline" size="lg">
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </section>);
}
