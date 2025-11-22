# AI-Powered Portfolio Website

A production-ready, secure, scalable, AI-powered personal portfolio application built for Jigyashu Saxena.

## Features

- **Web 3.0 Experience**: Immersive 3D space background with a cruising Star Cruiser, warp-speed stars, and celestial objects.
- **Star Wars Theme**: Iconic Star Destroyer-style ship and interactive Jedi Warrior navbar element with lightsaber effects.
- **AI Advisor Hub**: Interact with 3 distinct AI agents (Financial, Trade, Software) powered by **Google Gemini 2.0 Flash**.
- **Interactive UI**:
    - Draggable profile picture with physics-based reset.
    - Mouse-reactive news shuffle.
    - Fluid cursor interactions.
- **Project Showcase**: Detailed views of projects with tech stacks and GitHub links.
- **Achievements**: Timeline of hackathon wins and certifications.
- **Contact System**: Functional contact form with email notifications and database persistence.
- **Secure & Scalable**: Rate limiting, security headers, input validation, and optimized build.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, ShadCN UI.
- **3D Graphics**: Three.js, React Three Fiber, Drei, Maath.
- **Backend**: Next.js API Routes, Node.js 18 compatible.
- **Database**: Prisma ORM with SQLite (Development) / PostgreSQL (Production ready).
- **AI**: Integration with Google Gemini API (`gemini-2.0-flash`).

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   GEMINI_API_KEY="your-gemini-api-key" # Required for AI features
   EMAIL_USER="your-email@gmail.com" # Optional: For sending emails
   EMAIL_PASS="your-app-password" # Optional: For sending emails
   ```

4. **Database Setup**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is optimized for deployment on Vercel.
1. Push code to GitHub.
2. Import project in Vercel.
3. Add environment variables (`DATABASE_URL`, `GEMINI_API_KEY`, etc.).
4. Deploy.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (including 3D scenes).
- `src/lib`: Utilities, database client, and shared data.
- `prisma`: Database schema and migrations.
