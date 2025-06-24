
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare, Send, ArrowLeft, Tag, CalendarDays } from 'lucide-react';
import { getPostById, type ForumPost, type ForumComment } from '@/lib/forumData';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


export default function ForumPostPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const postId = params.id as string;

  const [post, setPost] = useState<ForumPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0); // Local state for likes
  const [isLiked, setIsLiked] = useState(false); // Local state for like button

  useEffect(() => {
    if (postId) {
      const fetchedPost = getPostById(postId);
      if (fetchedPost) {
        setPost(fetchedPost);
        setLikes(fetchedPost.upvotes); // Initialize likes from dummy data
      } else {
        // Handle post not found, e.g., redirect or show error
        router.push('/community-forum'); // Or a 404 page
      }
      setIsLoading(false);
    }
  }, [postId, router]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    // In a real app, this would be an API call
    toast({ title: isLiked ? "Unliked Post (Demo)" : "Liked Post! (Demo)", description: "Your preference has been noted for this session."});
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
        toast({title: "Empty Comment", description: "Please write something to comment.", variant: "destructive"});
        return;
    }
    // In a real app, this would submit the comment to a backend
    // For demo:
    const demoComment: ForumComment = {
        id: `c-new-${Date.now()}`,
        author: "Current User (Demo)",
        avatarFallback: "CU",
        date: "Just now",
        text: newComment,
    };
    if(post){
        setPost({...post, dummyComments: [...post.dummyComments, demoComment]});
    }
    setNewComment("");
    toast({title: "Comment Posted (Demo)", description: "Your comment has been added to the discussion below."});
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/20">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-40 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/20">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold">Post Not Found</h1>
          <p className="text-muted-foreground">The post you are looking for does not exist or may have been removed.</p>
          <Button asChild className="mt-4">
            <Link href="/community-forum">Back to Forum</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forum
        </Button>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">{post.title}</CardTitle>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={post.avatarImage || `https://placehold.co/40x40.png?text=${post.avatarFallback}`} alt={post.author} data-ai-hint="author avatar" />
                <AvatarFallback>{post.avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium text-foreground">{post.author}</span>
                <div className="flex items-center gap-1 text-xs">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>Posted on {post.date}</span>
                </div>
              </div>
            </div>
            {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="mr-1 h-3 w-3"/>{tag}
                        </Badge>
                    ))}
                </div>
            )}
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-foreground/90 whitespace-pre-line leading-relaxed py-6">
            {post.fullContent}
          </CardContent>
          <CardFooter className="pt-6 border-t">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" onClick={handleLike} className={`flex items-center gap-1.5 text-muted-foreground hover:text-primary ${isLiked ? 'text-primary' : ''}`}>
                <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-primary' : ''}`} />
                <span>{likes} Like{likes !== 1 ? 's' : ''} (Demo)</span>
              </Button>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MessageSquare className="h-5 w-5" />
                <span>{post.dummyComments.length} Comment{post.dummyComments.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Separator className="my-8" />

        <Card className="shadow-lg mt-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                    <MessageSquare className="text-primary h-6 w-6"/> Comments ({post.dummyComments.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                {post.dummyComments.length > 0 ? (
                    <div className="space-y-6">
                        {post.dummyComments.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={`https://placehold.co/40x40.png?text=${comment.avatarFallback}`} alt={comment.author} data-ai-hint="commenter avatar" />
                                    <AvatarFallback>{comment.avatarFallback}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-muted/30 p-3 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                                    </div>
                                    <p className="text-sm text-foreground/80 mt-1">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                )}

                <form onSubmit={handlePostComment} className="mt-8 space-y-4">
                    <div>
                        <label htmlFor="newComment" className="block text-sm font-medium text-foreground mb-1">
                            Leave a Comment (Demo)
                        </label>
                        <Textarea
                            id="newComment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts or experiences..."
                            rows={4}
                            className="bg-background"
                        />
                    </div>
                    <Button type="submit">
                        <Send className="mr-2 h-4 w-4" /> Post Comment (Demo)
                    </Button>
                </form>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
