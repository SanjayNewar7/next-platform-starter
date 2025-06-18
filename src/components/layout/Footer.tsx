
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Linkedin, Youtube, Shield } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const email = (event.target as any).elements.email.value; // If you need the email value
    toast({
      title: "Subscription Received!",
      description: "Thank you for subscribing to BoundaryWise updates and news.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Banner Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 md:p-12 rounded-xl shadow-lg mb-16 flex flex-col md:flex-row items-center text-white overflow-hidden">
          <div className="md:w-2/3 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Connect with BoundaryWise
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Explore resources, get support, and start your journey to healthier boundaries today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/help-center">Explore Resources</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-blue-700/50 border border-white/50 hover:border-white/80" asChild>
                <Link href="/community-forum">Join Community</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center md:justify-end relative">
            <Image
              src="https://placehold.co/300x250.png"
              alt="Supportive community"
              width={300}
              height={250}
              className="rounded-lg object-cover"
              data-ai-hint="community connect"
            />
             <Shield className="absolute text-white/20 h-48 w-48 -bottom-12 -right-12 transform rotate-12 opacity-30" />
          </div>
        </div>

        {/* Link Columns Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div>
            <h5 className="font-semibold text-foreground mb-4">Useful Links</h5>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/assistant" className="text-muted-foreground hover:text-primary">AI Assistant</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link></li>
              <li><Link href="/log-experience" className="text-muted-foreground hover:text-primary">Log Experience</Link></li>
              <li><Link href="/faqs" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link href="/help-center" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="/contact-support" className="text-muted-foreground hover:text-primary">Contact Support</Link></li>
              <li><Link href="/community-forum" className="text-muted-foreground hover:text-primary">Community Forum</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog (Coming Soon)</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Articles (Coming Soon)</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Guides (Coming Soon)</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Events (Coming Soon)</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-4">Subscribe</h5>
            <p className="text-muted-foreground mb-3">Join our community to receive updates and tips.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <Input type="email" name="email" placeholder="Enter your email" className="bg-muted/50 border-border/50" />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">By subscribing, you agree to our Privacy Policy.</p>
          </div>
        </div>

        {/* Encouraging Message */}
        <div className="text-center text-muted-foreground text-sm mb-12 space-y-4 py-8 border-y border-border/30">
          <div>
            <p className="max-w-2xl mx-auto leading-relaxed">
              Setting healthy boundaries is a journey of self-discovery and empowerment. Be kind to yourself, celebrate every step, and remember BoundaryWise is here to support you. You&apos;re not alone in this.
            </p>
          </div>
        </div>


        {/* Bottom Bar Section */}
        <div className="text-center text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold text-foreground">BoundaryWise</span>
            </div>
            <div className="flex gap-4 items-center order-first md:order-none mb-4 md:mb-0">
              <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-primary">Cookie Policy</Link>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/sanjay.rajbhandari.2025" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/sanjay_newar7/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/in/sanjaya-rajbhandari-089a31296/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={20} /></a>
              <a href="https://www.youtube.com/@SanjayaRajbhandari" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary"><Youtube size={20} /></a>
            </div>
          </div>
          <p className="mt-6">&copy; {new Date().getFullYear()} BoundaryWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
