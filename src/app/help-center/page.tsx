
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, BookOpen, Users, MessageSquare, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Help Center</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Welcome to the MeroSathi Help Center. Find resources, get support, and connect with our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-headline">FAQs & Guides</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Find answers to common questions and learn more about setting healthy boundaries.
              </p>
              <Button asChild variant="outline">
                <Link href="/faqs" className="flex items-center">
                  View FAQs <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="link" className="text-primary p-0 h-auto mt-2">
                <Link href="#">
                  Explore Self-Help Guides (Coming Soon)
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-headline">Community Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Connect with others, share experiences, and learn from the MeroSathi community.
              </p>
              <Button asChild variant="outline">
                <Link href="/community-forum" className="flex items-center">
                  Visit Forum <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-headline">Direct Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Need personalized assistance? Our support team is here to help you.
              </p>
              <Button asChild>
                <Link href="/contact-support" className="flex items-center">
                  Contact Us <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 shadow-lg bg-card">
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">Connect with the Creator</CardTitle>
                <CardDescription>Reach out to Sanjaya Rajbhandari, the creator of MeroSathi.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="https://www.linkedin.com/in/sanjaya-rajbhandari-089a31296/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Linkedin className="mr-2 h-5 w-5"/> LinkedIn
                    </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                     <a href="https://www.instagram.com/sanjay_newar7/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Instagram className="mr-2 h-5 w-5"/> Instagram
                    </a>
                </Button>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
