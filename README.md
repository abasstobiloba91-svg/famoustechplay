# FamousTechPlay

A music distribution platform built with React and Vite, deployed on Vercel.

## Features

- Artist dashboard for managing releases
- Admin dashboard for overseeing distributions
- Demo data for testing
- Backend integration with Supabase

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. For development: `npm run dev`
4. For build: `npm run build`

## Backend Setup with Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update `src/supabase.js` with your URL and key
4. Run the SQL in `supabase-setup.sql` in your Supabase SQL editor
5. For demo users, they use local data; for real users, sign up via Supabase auth

## Deployment

The app is configured for Vercel deployment with SPA routing.

## Demo

- Artist: artist@demo.com / demo
- Admin: admin@demo.com / admin