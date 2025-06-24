
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Send, Linkedin, Instagram, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactSupportPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle form submission here (e.g., send to an API)
    alert("Thank you for your message! This is a demo form. In a real app, your message would be sent to our support team.");
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Contact Support</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            We're here to help! Reach out to us with your questions, feedback, or if you need assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Send className="h-6 w-6 text-primary" /> Send Us a Message (Demo)
              </CardTitle>
              <CardDescription>Fill out the form below. This is a non-functional demo form.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-medium">Your Name</Label>
                  <Input type="text" id="name" placeholder="e.g., Sita Sharma" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium">Your Email</Label>
                  <Input type="email" id="email" placeholder="e.g., sita.sharma@example.com" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject" className="font-medium">Subject</Label>
                  <Input type="text" id="subject" placeholder="e.g., Question about Financial Boundaries" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="font-medium">Your Message</Label>
                  <Textarea id="message" placeholder="Describe your issue or question in detail..." rows={5} required className="mt-1" />
                </div>
                <Button type="submit" className="w-full">
                  Send Message (Demo)
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" /> Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">For direct inquiries, you can email us at:</p>
                <a href="mailto:support@merosathi.example.com" className="text-primary font-medium hover:underline text-lg">
                  support@merosathi.example.com
                </a>
                <p className="text-xs text-muted-foreground mt-1">(Please note this is a placeholder email address)</p>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                   <HelpCircle className="h-6 w-6 text-primary"/> Other Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <p className="text-muted-foreground">
                    You might find answers in our <Link href="/faqs" className="text-primary hover:underline">FAQs section</Link> or our <Link href="/help-center" className="text-primary hover:underline">Help Center</Link>.
                </p>
                <p className="text-muted-foreground">Connect with Sanjaya Rajbhandari (Creator):</p>
                <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                        <a href="https://www.linkedin.com/in/sanjaya-rajbhandari-089a31296/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Linkedin className="mr-2 h-4 w-4"/> LinkedIn
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href="https://www.instagram.com/sanjay_newar7/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Instagram className="mr-2 h-4 w-4"/> Instagram
                        </a>
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
