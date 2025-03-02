import { CheckCircle } from "lucide-react";
import Content from "../ui/content";
export default function Features() {
    return (<section className="bg-neutral-100 py-24 dark:bg-neutral-900">
      <Content>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Features
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-6xl dark:text-neutral-50">
            Everything you need to build modern apps
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="flex flex-wrap gap-4">
            {features.map((feature) => (<div key={feature.name} className="group relative flex grow basis-96 flex-col overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-neutral-800/50">
                <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 transform opacity-[0.02] transition-transform duration-300 group-hover:scale-125">
                  <feature.icon className="h-48 w-48"/>
                </div>

                <div className="bg-primary relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-lg text-white transition-transform duration-300 group-hover:rotate-12 dark:bg-neutral-800">
                  <feature.icon className="h-6 w-6"/>
                </div>

                <div className="relative z-10 flex flex-auto flex-col">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-neutral-600 dark:text-neutral-300">
                    {feature.description}
                  </p>
                </div>
              </div>))}
          </div>
        </div>
      </Content>
    </section>);
}
const features = [
    {
        name: "User Management",
        description: "Complete user system with social logins, email verification, and profile management.",
        icon: CheckCircle,
    },
    {
        name: "Subscription Billing",
        description: "Handle recurring payments, usage-based billing, and payment method management.",
        icon: CheckCircle,
    },
    {
        name: "Modern Design System",
        description: "Professionally designed components following the latest web standards and best practices.",
        icon: CheckCircle,
    },
    {
        name: "Analytics Dashboard",
        description: "Track key metrics and user behavior with beautiful charts and real-time data.",
        icon: CheckCircle,
    },
    {
        name: "API Integration",
        description: "Connect with third-party services and extend functionality through our REST API.",
        icon: CheckCircle,
    },
    {
        name: "Performance Optimized",
        description: "Built for speed with automatic code splitting, caching, and image optimization.",
        icon: CheckCircle,
    },
];
