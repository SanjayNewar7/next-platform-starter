# How to Deploy This Project

This project is hosted in Firebase Studio, a cloud-based development environment. You **do not** need to use the `firebase` command-line tool (CLI) on your local computer to deploy it.

Deployment for this Next.js application is handled directly through the **Firebase Console website**.

## Step 1: Upgrade to the Blaze Plan (Required)

Before you can use App Hosting, your Firebase project must be on the "Blaze" (pay-as-you-go) plan.

1.  **Go to your Project's Usage and Billing Page:** [https://console.firebase.google.com/project/merosathi-7213c/usage/details](https://console.firebase.google.com/project/merosathi-7213c/usage/details)
2.  Click the **"Upgrade"** or **"Modify plan"** button.
3.  Follow the prompts to select the **Blaze plan** and link a billing account.
    *   **Note:** The Blaze plan has a generous free tier. You will likely not be charged unless your app gets significant traffic. This step is required to enable the App Hosting service.

## Step 2: Deploy from the Firebase Console

Once your project is on the Blaze plan, follow these steps:

1.  **Go to the Firebase Console:** [https://console.firebase.google.com/](https://console.firebase.google.com/)
2.  **Select your `MeroSathi` project.**
3.  In the left-hand menu, under the **Build** section, click on **App Hosting**. (This option becomes available after upgrading to the Blaze plan).
4.  **Create the Backend:** Since this is your first time, the page will be empty. Click the **"Create backend"** or **"Get Started"** button.
5.  **Connect GitHub:** Follow the on-screen instructions to **connect your GitHub repository**.
6.  **Select Repository and Branch:**
    *   Choose your `SanjayNewar7/MeroSathiWeb` repository.
    *   Select the `main` branch to deploy from.
7.  **Confirm and Deploy:** Once you confirm, Firebase will automatically start building and deploying your app.

You can monitor the progress on the App Hosting page. After the first deployment, every new push to your `main` branch on GitHub will automatically trigger a new deployment.