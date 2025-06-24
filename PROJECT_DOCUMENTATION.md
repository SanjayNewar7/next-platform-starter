
# MeroSathi Project Documentation

## 1. Overview

**MeroSathi** is a web application designed to empower individuals, particularly within the Nepali context, to understand, establish, and maintain healthy personal boundaries. The application provides an AI-powered assistant for personalized advice, tools to track the user's boundary-setting journey, and a supportive community space.

The core mission is to offer accessible, culturally-aware resources that help users build confidence and foster respectful relationships, leading to improved well-being and personal growth.

---

## 2. Key Features

- **AI Boundary Assistant:** A Genkit-powered AI that provides personalized strategies and example phrases for setting boundaries across various life domains (Financial, Social, Work-Life, etc.). It is specifically prompted to consider Nepali cultural nuances.
- **User Authentication:** Secure sign-up and login functionality using Firebase Authentication (Email/Password and Google Sign-In).
- **Personalized Dashboard:** A central hub for users to visualize their progress. It includes summary statistics and charts showing boundary outcomes by type.
- **Experience Logging:** A system for users to log the real-world outcomes of their attempts to set boundaries (as 'successful' or 'challenged').
- **Follow-up AI Advice:** If a boundary is logged as 'challenged', the user can request new, refined AI advice tailored to overcome the specific difficulty they faced.
- **Community Forum (Demo):** A space for users to connect, share experiences, and offer mutual support.
- **Static & Info Pages:** Includes About, FAQs, Contact, Privacy Policy, and Terms of Service pages.

---

## 3. User Workflows

### a. Onboarding (Sign Up & Login)
1.  A new user lands on the homepage and is prompted to **Sign Up**.
2.  They can create an account using their email and a password or by using the Google Sign-In option.
3.  Upon successful authentication, a user profile is created in **Firebase Firestore** to store their data.
4.  The user is redirected to their personal **Dashboard**.

### b. Getting AI Advice
1.  From the navigation or dashboard, the user goes to the **AI Assistant** page (`/assistant`).
2.  They select a boundary type, describe their situation, their desired outcome, and any past attempts.
3.  On submission, the form data is sent to the `getBoundaryRecommendation` AI flow.
4.  The AI generates a recommendation, explanation, and example phrases.
5.  This new boundary and its AI advice are automatically saved to the user's Firestore data with a status of `'pending'`.

### c. Logging an Experience
1.  After attempting to implement the AI's advice, the user navigates to the **My Experience** page (`/log-experience`).
2.  They select the boundary type and then the specific situation they are logging from a list of their `'pending'` boundaries.
3.  They choose whether the outcome was **'successful'** or **'challenged'**.
    - If **successful**, they can optionally add positive feedback.
    - If **challenged**, they are encouraged to describe the challenge. They can then request **new AI advice** for this specific challenge.
4.  The boundary's status is updated in Firestore from `'pending'` to `'successful'` or `'challenged'`, and a `loggedAt` timestamp is added.

### d. Tracking Progress
1.  The user visits the **Dashboard** (`/dashboard`).
2.  The app fetches all their boundary data from Firestore via `getAggregatedStats`.
3.  The dashboard displays summary cards (Total Defined, Successful, Challenged, etc.) and a stacked bar chart showing the outcomes for each boundary type.

---

## 4. Technical Architecture

MeroSathi is built on a modern, serverless tech stack.

- **Frontend:**
    - **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
    - **Language:** TypeScript
    - **UI Library:** [React](https://react.dev/)
    - **Component Library:** [ShadCN/UI](https://ui.shadcn.com/)
    - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    - **State Management:** React Context API (for authentication) and component state.

- **Backend & Database:**
    - **Provider:** [Firebase](https://firebase.google.com/)
    - **Authentication:** Firebase Authentication manages user sign-up, login, and sessions.
    - **Database:** [Cloud Firestore](https://firebase.google.com/docs/firestore) (a NoSQL database) is used to store user-specific data, including all logged boundaries. Data is structured under a `users` collection, with each user's boundaries stored in a sub-collection.

- **Generative AI:**
    - **Framework:** [Genkit](https://firebase.google.com/docs/genkit) (an open-source AI framework)
    - **AI Model:** Google's Gemini family of models via the `@genkit-ai/googleai` plugin.
    - **Implementation:** The AI logic is defined in server-side "flows" located in `src/ai/flows/`.

---

## 5. Core Logic Explained

### `src/contexts/auth-context.tsx`
- This file sets up a React Context for managing the global authentication state.
- It handles all interactions with Firebase Auth: `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signOut`, and `updateUserProfile`.
- It uses a `useEffect` hook with `onAuthStateChanged` to listen for real-time changes in the user's login state.
- When a new user is created, it calls `createUserDocument` to create a corresponding record in Firestore.

### `src/lib/userData.ts`
- This is the data access layer for all user-specific boundary information stored in Firestore.
- It defines the data structures (`LoggedBoundary`, `AggregatedStats`).
- **`addBoundary`**: Creates a new boundary document in the current user's sub-collection in Firestore with a `'pending'` status.
- **`logBoundaryOutcome`**: Updates an existing boundary document's status to `'successful'` or `'challenged'`.
- **`getBoundaries`**: Fetches a list of boundaries, with options to filter by status or type.
- **`getAggregatedStats`**: Fetches all of a user's boundaries and computes the statistics needed for the dashboard.

### `src/ai/flows/boundary-recommendation.ts`
- This file contains the core AI logic for the application.
- It uses Zod schemas (`BoundaryRecommendationInputSchema`, `BoundaryRecommendationOutputSchema`) to define the expected input from the user and the structured output from the AI.
- The `prompt` is constructed using Handlebars templating. It has conditional logic (`{{#if isFollowUp}}`) to provide either initial advice or refined follow-up advice based on the user's input.
- The prompt is specifically engineered to instruct the AI to act as a "personal boundary expert specializing in advice relevant to a Nepali audience."
- The `boundaryRecommendationFlow` wraps the prompt call and is the main entry point for the AI logic.

---

## 6. Project Assets

- **Logo:** The MeroSathi logo is located at `/public/images/merosathi_logo.png`.
- **Images:** Other illustrative images are stored in `/public/images/`. These include:
    - `image1.png`: Used in the footer.
    - `website_image.png`: Used on the About page.
    - `creator_image.png`: Used on the About page for the creator's bio.
- **Image Placeholders:** Placeholder images are dynamically loaded from `https://placehold.co/`.

---

## 7. Deployment

The application is configured for deployment on **Firebase App Hosting**.

- **Configuration:** The `apphosting.yaml` file contains the build and start commands (`npm run build`, `npm start`) that tell Firebase how to deploy the Next.js app.
- **Requirement:** Deployment requires the Firebase project to be on the **Blaze (pay-as-you-go) plan**.
- **Process:**
    1. Upgrade the Firebase project to the Blaze plan.
    2. In the Firebase Console, navigate to "App Hosting".
    3. Click "Create backend" and connect the project to its GitHub repository.
    4. Once linked, every push to the `main` branch on GitHub will automatically trigger a new build and deployment.
