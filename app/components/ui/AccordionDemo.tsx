'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is this application?",
    answer: "This is a demo application showcasing various UI components and forms.",
  },
  {
    question: "How do I use the forms?",
    answer: "Simply fill in the required fields and submit. Validation will ensure your data is correct.",
  },
  {
    question: "What happens when I submit?",
    answer: "You'll receive a confirmation toast message and the data will be logged to the console.",
  },
];

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}