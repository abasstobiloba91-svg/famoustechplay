# FamousTechPlay

A music distribution platform built with React and Vite, deployed on Vercel.

## Features

- Artist dashboard for managing releases
- Admin dashboard for overseeing distributions
- File upload for music releases
- User authentication and sign up
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
3. Update `src/supabase.js` with your URL and key:
   ```javascript
   const supabaseUrl = 'https://your-project.supabase.co'
   const supabaseAnonKey = 'your-anon-key'
   ```
4. Run the SQL in `supabase-setup.sql` in your Supabase SQL editor
5. For demo users, they use local data; for real users, sign up via Supabase auth

## File Upload

Artists can upload music files through the dashboard:
- Go to Releases tab
- Click "+ Upload New"
- Fill in title, type, genre
- Select audio file (MP3, WAV, etc.)
- Files are stored securely in Supabase Storage

## User Registration

New users can sign up:
- Click "Sign up free" on the login page
- Fill in name, email, password, and role
- Account is created in Supabase Auth and user profile in database

## Deployment

The app is configured for Vercel deployment with SPA routing.

## Demo

- Artist: artist@demo.com / demo
- Admin: admin@demo.com / admin