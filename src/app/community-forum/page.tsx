
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageCircle, ThumbsUp, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const dummyForumPosts = [
  {
    id: '1',
    title: "कसरी आफ्नो परिवारलाई 'नाइ' भन्ने?",
    author: "सृजना K.",
    avatarFallback: "SK",
    date: "३ दिन अगाडि",
    replies: 12,
    upvotes: 45,
    snippet: "मेरो परिवारले मलाई सधैं आर्थिक सहयोग माग्नुहुन्छ, तर मेरो पनि आफ्नो खर्च छ। कसरी उहाँहरुको चित्त नदुखाई 'नाइ' भन्ने होला? केही सुझाव दिनुहुन्छ कि?",
    tags: ["Financial", "Family", "Communication"]
  },
  {
    id: '2',
    title: "Work-Life Balance in Nepal: Is it a Myth?",
    author: "Rohan S.",
    avatarFallback: "RS",
    date: "5 days ago",
    replies: 25,
    upvotes: 78,
    snippet: "I feel constantly overwhelmed with work, even after office hours. My boss expects me to be available 24/7. How are others managing this, especially in the Nepali work culture?",
    tags: ["Work-Life Balance", "Career", "Stress"]
  },
  {
    id: '3',
    title: "सामाजिक सम्बन्धमा सीमाहरू कसरी कायम राख्ने?",
    author: "अन्जना T.",
    avatarFallback: "AT",
    date: "१ हप्ता अगाडि",
    replies: 8,
    upvotes: 33,
    snippet: "मेरा केही साथीहरूले मेरो व्यक्तिगत समयको कदर गर्दैनन्। उनीहरू बिना सूचना घरमा आइपुग्छन् वा ढिलो राति फोन गर्छन्। यसलाई कसरी सम्हाल्ने?",
    tags: ["Social Relationships", "Friendship", "Personal Space"]
  },
   {
    id: '4',
    title: "Sharing Success: Saying 'No' to Extra Work Politely",
    author: "Prakash G.",
    avatarFallback: "PG",
    date: "2 weeks ago",
    replies: 15,
    upvotes: 62,
    snippet: "I used the AI assistant's advice to decline extra projects from my manager without sounding uncooperative. It actually worked! Just wanted to share this small win.",
    tags: ["Work-Life Balance", "Success Story", "Communication"]
  }
];

export default function CommunityForumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">BoundaryWise Community Forum</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Connect, share, and learn with fellow BoundaryWise users. This is a space for mutual support and growth. (Demo Content)
          </p>
          <Button size="lg" className="mt-6">
            <PlusCircle className="mr-2 h-5 w-5" /> Start a New Discussion (Demo)
          </Button>
        </div>

        <div className="space-y-6">
          {dummyForumPosts.map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl md:text-2xl font-headline text-primary hover:underline cursor-pointer">
                        <Link href={`/community-forum/post/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    {/* Tags could go here if needed */}
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
                    <span>{post.replies} replies</span>
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
        <div className="text-center mt-12">
            <p className="text-muted-foreground">This is a demonstration of the community forum. More features and actual discussions coming soon!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
