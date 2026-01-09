# CampusFlow AI

This is a smart student life assistant built with Next.js, Firebase, and Genkit. It's designed to help students turn unexpected free time into opportunities for learning, collaboration, or personal growth.

## Getting Started

To run this project locally, you'll need to have [Node.js](https://nodejs.org/) (version 18 or later) installed on your machine.

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine:

```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the necessary project dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

The project uses a `.env` file to manage environment variables. Create a new file named `.env` in the root of your project and add your Firebase and Genkit API keys.

You can get your Firebase project configuration from the Firebase console:
*Go to Project Settings > General > Your apps > Web app > Firebase SDK snippet > Config*.

```
# .env

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
# ... add other Firebase config values as needed

# Google AI (Gemini) API Key for Genkit
GEMINI_API_KEY="AIza..."
```

**Note:** You can obtain a `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run the Development Servers

This project requires two separate terminal sessions to run concurrently: one for the Next.js frontend and one for the Genkit AI backend.

**Terminal 1: Start the Genkit AI server**

This server runs your AI flows.

```bash
npm run genkit:dev
```

**Terminal 2: Start the Next.js application**

This server runs the user interface.

```bash
npm run dev
```

### 5. Open the Application

Once both servers are running, you can access the application in your browser at:

[http://localhost:3000](http://localhost:3000)

The application will automatically redirect you to the `/dashboard` page.