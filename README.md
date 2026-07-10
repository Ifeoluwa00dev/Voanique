# VOANIQUÉ — Pre-Launch Waitlist (Next.js)

The pre-launch waitlist page for VOANIQUÉ, a luxury lip plumper brand launching in 
Nigeria. Built as a single Next.js app — no separate backend, no split hosting.

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger for all animation
- Resend (Audiences API) for Early Access signups — single source of truth, no database

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and add your real values:
   ```bash
   cp .env.example .env.local
   ```
   Fill in:
   - `RESEND_API_KEY` — from Resend → API Keys
   - `RESEND_AUDIENCE_ID` — from Resend → Audience

3. Run locally:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Deploying to Vercel

1. Push this project to a GitHub repo
2. Import the repo at vercel.com
3. Add `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` as Environment Variables in the 
   Vercel project settings
4. Deploy — Vercel auto-detects Next.js, no build config needed
5. Point voanique.com at the Vercel deployment via Cloudflare DNS once confirmed working

## Notes
- All signups sync directly to Resend's Audience API — no Supabase, no separate database
- The waitlist form gracefully handles duplicate signups (shows "Rejoining the Ritual" 
  instead of an error)
- Animation follows a deliberate restraint principle: few, precise GSAP animations 
  rather than many small decorative ones
