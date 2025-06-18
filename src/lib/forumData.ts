
export interface ForumComment {
  id: string;
  author: string;
  avatarFallback: string;
  date: string;
  text: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatarFallback: string;
  avatarImage?: string; // Optional: if you have specific images
  date: string;
  replies: number; // This will be dynamically set by dummyComments.length if needed
  upvotes: number;
  snippet: string;
  fullContent: string;
  tags: string[];
  dummyComments: ForumComment[];
}

export const dummyForumPosts: ForumPost[] = [
  {
    id: '1',
    title: "कसरी आफ्नो परिवारलाई 'नाइ' भन्ने?",
    author: "सृजना K.",
    avatarFallback: "SK",
    date: "३ दिन अगाडि",
    replies: 2, // This will be derived from dummyComments.length
    upvotes: 45,
    snippet: "मेरो परिवारले मलाई सधैं आर्थिक सहयोग माग्नुहुन्छ, तर मेरो पनि आफ्नो खर्च छ। कसरी उहाँहरुको चित्त नदुखाई 'नाइ' भन्ने होला?",
    fullContent: "मेरो परिवारले मलाई सधैं आर्थिक सहयोग माग्नुहुन्छ, तर मेरो पनि आफ्नो खर्च छ। घरको जेठो छोरा भएकोले सबै जिम्मेवारी मेरै काँधमा आएको जस्तो लाग्छ। कहिलेकाहीँ त आफ्नो लागि केही सोच्न पनि गाह्रो हुन्छ। कसरी उहाँहरुको चित्त नदुखाई 'नाइ' भन्ने होला? केही सुझाव दिनुहुन्छ कि? मैले केही पटक अप्रत्यक्ष रूपमा संकेत गर्ने प्रयास गरें, तर खासै प्रभावकारी भएन।",
    tags: ["Financial", "Family", "Communication", "Nepali"],
    dummyComments: [
      { id: 'c1-1', author: "विवेक P.", avatarFallback: "VP", date: "२ दिन अगाडि", text: "यो समस्या धेरैको साझा हो सृजना जी। स्पष्ट तर नम्र भएर आफ्नो अवस्था बताउनु नै उत्तम हुन्छ होला। 'अहिले म आफैं अलि आर्थिक दबाबमा छु, अर्को पटक हेरौंला नि' जस्ता कुराले पनि काम गर्न सक्छ।" },
      { id: 'c1-2', author: "रमिता S.", avatarFallback: "RS", date: "१ दिन अगाडि", text: "हो, विवेक जीले भनेको ठीक हो। आफ्नो बजेट बनाएर देखाउँदा पनि कहिलेकाहीँ उहाँहरुले बुझ्नुहुन्छ। BoundaryWise को AI assistant ले पनि यस्तोमा राम्रो सल्लाह देला।" }
    ]
  },
  {
    id: '2',
    title: "Work-Life Balance in Nepal: Is it a Myth?",
    author: "Rohan S.",
    avatarFallback: "RS",
    date: "5 days ago",
    replies: 3,
    upvotes: 78,
    snippet: "I feel constantly overwhelmed with work, even after office hours. My boss expects me to be available 24/7. How are others managing this?",
    fullContent: "I feel constantly overwhelmed with work, even after office hours. My boss expects me to be available 24/7, and the work culture here seems to reward those who stay late, not necessarily those who work efficiently. I love my job, but I'm starting to feel burnt out. How are others managing this, especially in the Nepali work culture? Are there any effective strategies to set boundaries with employers without risking job security?",
    tags: ["Work-Life Balance", "Career", "Stress", "NepaliWorkCulture"],
    dummyComments: [
      { id: 'c2-1', author: "Anjali G.", avatarFallback: "AG", date: "4 days ago", text: "It's tough, Rohan. I started blocking out 'focus time' in my calendar and communicating my working hours clearly. It took time, but my team is slowly respecting it more." },
      { id: 'c2-2', author: "Prakash K.", avatarFallback: "PK", date: "4 days ago", text: "I had a frank conversation with my manager about workload and expectations. It wasn't easy, but it led to some positive changes. Sometimes direct communication is key." },
      { id: 'c2-3', author: "UserX", avatarFallback: "UX", date: "3 days ago", text: "The AI assistant in this app actually gave me some good phrases to use with my boss. Might be worth a try!" }
    ]
  },
  {
    id: '3',
    title: "सामाजिक सम्बन्धमा सीमाहरू कसरी कायम राख्ने?",
    author: "अन्जना T.",
    avatarFallback: "AT",
    date: "१ हप्ता अगाडि",
    replies: 2,
    upvotes: 33,
    snippet: "मेरा केही साथीहरूले मेरो व्यक्तिगत समयको कदर गर्दैनन्। उनीहरू बिना सूचना घरमा आइपुग्छन् वा ढिलो राति फोन गर्छन्। यसलाई कसरी सम्हाल्ने?",
    fullContent: "मेरा केही साथीहरूले मेरो व्यक्तिगत समयको कदर गर्दैनन्। उनीहरू बिना सूचना घरमा आइपुग्छन् वा ढिलो राति फोन गर्छन्। मलाई उनीहरुसँगको सम्बन्ध बिगार्न मन छैन, तर यसले गर्दा मेरो आफ्नो काम र आराममा बाधा पुगिरहेको छ। यस्तो अवस्थामा कसरी नम्रतापूर्वक आफ्नो सीमा स्पष्ट पार्ने होला? 'अहिले व्यस्त छु' भन्दा पनि कहिलेकाहीँ मान्दैनन्।",
    tags: ["Social Relationships", "Friendship", "Personal Space", "Nepali"],
    dummyComments: [
      { id: 'c3-1', author: "समीर B.", avatarFallback: "SB", date: "6 दिन अगाडि", text: "अन्जना जी, यो अलि अप्ठ्यारो स्थिति हो। 'म तिमीहरुसँग समय बिताउन चाहन्छु, तर आउनु अघि एकपटक फोन गर्यौ भने मलाई सजिलो हुन्छ' भनेर कुरा गर्न सक्नुहुन्छ।" },
      { id: 'c3-2', author: "इशा R.", avatarFallback: "IR", date: "5 दिन अगाडि", text: "मैले 'मेरो घरमा यो समय देखि यो समयसम्म मात्र भेट्न आउन मिल्छ' भनेर नियम बनाएको छु। सुरुमा अलि अनौठो माने पनि पछि बानी पर्छ।" }
    ]
  },
   {
    id: '4',
    title: "Sharing Success: Saying 'No' to Extra Work Politely",
    author: "Prakash G.",
    avatarFallback: "PG",
    date: "2 weeks ago",
    replies: 1,
    upvotes: 62,
    snippet: "I used the AI assistant's advice to decline extra projects from my manager without sounding uncooperative. It actually worked!",
    fullContent: "Just wanted to share a small win here! I was struggling with my manager constantly giving me extra projects that were outside my core responsibilities and capacity. I used the BoundaryWise AI assistant to get some phrases and strategies on how to decline politely but firmly. I explained my current workload and offered to help prioritize or see if someone else could take it on. To my surprise, my manager understood and didn't push back. Feeling so much better and less stressed!",
    tags: ["Work-Life Balance", "Success Story", "Communication"],
    dummyComments: [
      { id: 'c4-1', author: "Admin", avatarFallback: "BW", date: "2 weeks ago", text: "That's fantastic to hear, Prakash! Thanks for sharing your success. This is exactly what we hope BoundaryWise can help with." }
    ]
  }
];

export const getPostById = (id: string): ForumPost | undefined => {
  return dummyForumPosts.find(post => post.id === id);
};
