# Single-Page Blog Application

A modern, responsive single-page blog application built with Next.js, TypeScript, and Redux Toolkit. This project features full CRUD (Create, Read, Update, Delete) functionality for posts and a commenting system powered by Firebase Firestore.

## ✨ Live Demo

**[Link to Live Demo]**(https://blog-sample-a1av.vercel.app/)

## ⚙️ Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/AndreyKondakov/blog-sample.git
cd blog-sample
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add your Firebase project configuration keys. You can get these from your Firebase project settings.

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [HeroUI](https://heroui.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📂 Project Structure

The project follows a feature-based structure, keeping related logic, components, and types together.

```
/
├── app/              # Next.js App Router: contains all pages and layouts.
│   ├── posts/
│   │   ├── [id]/     # Dynamic routes for viewing and editing a single post.
│   └── page.tsx      # Homepage.
├── components/       # Reusable React components (e.g., PostList, PostForm, Navbar).
├── lib/              # Core logic, services, and schemas.
│   ├── firebase/     # Firebase configuration.
│── store/            # Redux Toolkit store and slices.
│── validators/       # Zod validation schemas.
├── providers/        # React Context providers (e.g., for Redux).
├── types/            # TypeScript type definitions.
└── public/           # Static assets.
```
