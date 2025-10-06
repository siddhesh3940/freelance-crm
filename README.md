# Freelance CRM

An AI-powered CRM platform designed for freelancers and small business owners to manage clients, projects, invoices, and communications efficiently.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Database**: Prisma ORM
- **AI**: OpenAI API, Vector embeddings
- **Payments**: Stripe
- **Email**: Resend
- **Queue**: BullMQ + Redis
- **Hosting**: Vercel

## 🛠️ Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd freelance-crm
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

3. **Database setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
freelance-crm/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── dashboard/       # Dashboard-specific components
├── lib/                 # Utility functions
├── prisma/             # Database schema
└── public/             # Static assets
```

## 🔧 Features

- **Client Management**: Track clients with detailed profiles
- **Project Tracking**: Organize work with projects and tasks
- **Smart Invoicing**: AI-assisted invoice generation
- **Time Tracking**: Monitor project hours and budgets
- **Communication Hub**: Centralized client communications
- **AI Assistant**: Get insights and suggestions
- **Payment Processing**: Stripe integration for payments

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/freelance-crm)

## 📝 License

MIT License - see LICENSE file for details.