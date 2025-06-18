
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-12">
          <Card className="shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt="Supportive community illustration"
                  width={600}
                  height={450}
                  className="object-cover w-full h-64 md:h-full"
                  data-ai-hint="community support"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">About BoundaryWise</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-5 text-foreground/80 text-lg leading-relaxed">
                  <p>
                    BoundaryWise is dedicated to empowering individuals, particularly within the Nepali context, to understand, establish, and uphold healthy personal boundaries. We believe that clear boundaries are fundamental to well-being, fostering respectful relationships and personal growth.
                  </p>
                  <p>
                    Our mission is to provide accessible, culturally-aware tools and resources. Through our AI-powered assistant, users can receive personalized guidance for various life situations—from financial matters to social interactions. The app also allows users to track their journey, reflecting on successes and challenges to refine their approach over time.
                  </p>
                  <p>
                    Our vision is a community where individuals feel confident, respected, and empowered in all their interactions, leading to more fulfilling lives. BoundaryWise aims to be a supportive companion on this journey of self-discovery and empowerment.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="shadow-xl overflow-hidden">
             <div className="md:flex md:flex-row-reverse">
              <div className="md:w-1/2">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt="Creator Sanjaya Rajbhandari"
                  width={600}
                  height={450}
                  className="object-cover w-full h-64 md:h-full"
                  data-ai-hint="creator portrait"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <CardHeader className="px-0 pt-0">
                    <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Sanjaya Rajbhandari" data-ai-hint="profile picture" />
                            <AvatarFallback className="text-2xl">SR</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">Meet the Creator</CardTitle>
                            <p className="text-primary font-medium text-xl">Sanjaya Rajbhandari</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-5 text-foreground/80 text-lg leading-relaxed">
                  <p>
                    Hi! I’m Sanjaya Rajbhandari, a passionate Graphics Designer by profession and a final-year Bachelor in Computer Applications (BCA) student. With a creative soul and a technical mind, I thrive at the intersection of design, technology, and innovation.
                  </p>
                  <p>
                    BoundaryWise is a project born from my desire to use these skills to create something meaningful. I believe technology can be a powerful tool for personal development, and this app is my effort to provide a supportive resource for individuals seeking to build healthier relationships and improve their well-being through better boundary setting.
                  </p>
                  <p>
                    My goal with BoundaryWise is to offer a user-friendly, empathetic, and culturally considerate platform that genuinely helps people navigate the often-complex journey of establishing and maintaining personal boundaries.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
