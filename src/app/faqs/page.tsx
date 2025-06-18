
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is BoundaryWise?",
    answer: "BoundaryWise is an application designed to help users, especially within the Nepali context, understand, define, and maintain healthy personal boundaries. It offers an AI-powered assistant for personalized advice and tools to track your boundary-setting journey."
  },
  {
    question: "Who is BoundaryWise for?",
    answer: "BoundaryWise is for anyone looking to improve their personal or professional relationships by setting clearer boundaries. While it has a special consideration for Nepali cultural nuances, its principles are applicable to a wide audience."
  },
  {
    question: "How does the AI Assistant work?",
    answer: "The AI Assistant takes your described situation, desired outcome, and (optionally) past attempts to provide personalized strategies and example phrases for setting boundaries. It's designed to consider cultural context in its suggestions."
  },
  {
    question: "Is my data private and secure?",
    answer: "BoundaryWise uses your browser's local storage to save your boundary data and preferences. This means your data stays on your device and is not sent to any external server in this current version. We prioritize your privacy."
  },
  {
    question: "How do I log my experiences with setting boundaries?",
    answer: "After defining a boundary with the AI Assistant, you can visit the 'Log Experience' page. There, you can select the specific boundary situation and record whether your attempt to implement it was 'successful' or 'challenged'."
  },
  {
    question: "What if the AI's initial advice doesn't work for me?",
    answer: "If a boundary attempt is challenging, you can log this on the 'Log Experience' page or find the boundary in the 'Challenged Boundaries' list (accessible from the dashboard). For challenged boundaries, you can describe the specific difficulty and request new, refined AI advice tailored to overcome that challenge."
  },
  {
    question: "How is Nepali culture considered in the advice?",
    answer: "The AI prompt is specifically instructed to consider Nepali cultural nuances when generating advice and example phrases. This aims to make the suggestions more relevant and practical for users in Nepal."
  },
  {
    question: "How can I track my progress?",
    answer: "The Dashboard provides an overview of your boundary-setting journey. It shows statistics like total boundaries defined, successful implementations, challenging situations, and your overall progress rate. The data is visualized in charts and summary cards."
  },
  {
    question: "Is BoundaryWise free to use?",
    answer: "Yes, BoundaryWise is currently a project developed by Sanjaya Rajbhandari and is free to use."
  },
  {
    question: "Who created BoundaryWise?",
    answer: "BoundaryWise was created by Sanjaya Rajbhandari, a Graphics Designer and final-year Bachelor in Computer Applications (BCA) student, as a project to combine his passion for design and technology to help individuals."
  }
];

export default function FAQsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Find answers to common questions about BoundaryWise.
            </CardDescription>
          </CardHeader>
          <div className="p-6 md:p-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="bg-background border border-border rounded-lg shadow-sm px-2">
                  <AccordionTrigger className="text-lg font-medium text-left hover:no-underline px-4 py-4 text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground px-4 pb-4 pt-0 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
