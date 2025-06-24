
"use client"; // Add this directive

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageCircle, ThumbsUp, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { dummyForumPosts } from '@/lib/forumData';

export default function CommunityForumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">MeroSathi Community Forum</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Connect, share, and learn with fellow MeroSathi users. This is a space for mutual support and growth.
          </p>
          <Button size="lg" className="mt-6" onClick={() => alert("Feature to start a new discussion coming soon!")}>
            <PlusCircle className="mr-2 h-5 w-5" /> Start a New Discussion (Demo)
          </Button>
        </div>

        <div className="space-y-6">
          {dummyForumPosts.map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl md:text-2xl font-headline hover:text-primary">
                        <Link href={`/community-forum/post/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={`https://placehold.co/40x40.png?text=${post.avatarFallback}`} alt={post.author} data-ai-hint="avatar person" />
                    <AvatarFallback>{post.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                  <span>&bull;</span>
                  <span>{post.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 line-clamp-3">{post.snippet}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.dummyComments.length} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.upvotes} upvotes</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/community-forum/post/${post.id}`}>Read More &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
