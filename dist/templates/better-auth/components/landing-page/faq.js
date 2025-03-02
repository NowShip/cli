import { Accordion, AccordionContent, AccordionItem, } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import Content from "../ui/content";
export default function Faq() {
    return (<section className="py-24">
      <Content>
        <div className="mx-auto max-w-4xl divide-y divide-neutral-200 dark:divide-neutral-800">
          <h2 className="relative mb-8 text-center text-2xl font-medium text-neutral-900 sm:text-3xl dark:text-neutral-50">
            <span className="text-primary mb-2 block text-sm font-semibold">
              FAQ
            </span>
            Frequently Asked Questions
            <span className="bg-primary mx-auto mt-4 block h-1 w-12 rounded-full"></span>
          </h2>

          <Accordion type="single" collapsible className="w-full" defaultValue="1">
            {items.map((item) => (<AccordionItem value={item.id} key={item.id} className="py-2">
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] leading-6 font-semibold transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                    {item.title}
                    <Plus size={16} strokeWidth={2} className="shrink-0 opacity-60 transition-transform duration-200" aria-hidden="true"/>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-muted-foreground pb-2">
                  {item.content}
                </AccordionContent>
              </AccordionItem>))}
          </Accordion>
        </div>
      </Content>
    </section>);
}
const items = [
    {
        id: "1",
        title: "What makes Origin UI different?",
        content: "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
    },
    {
        id: "2",
        title: "How can I customize the components?",
        content: "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
    },
    {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content: "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
    },
    {
        id: "4",
        title: "How accessible are the components?",
        content: "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
    },
];
