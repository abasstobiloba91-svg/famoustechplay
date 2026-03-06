-- Supabase Setup for FamousTechPlay

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('artist', 'admin')),
  name TEXT NOT NULL,
  av TEXT,
  plan TEXT DEFAULT 'Free',
  genre TEXT,
  country TEXT
);

-- Releases table
CREATE TABLE releases (
  id SERIAL PRIMARY KEY,
  aId UUID REFERENCES users(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  genre TEXT,
  earnings INTEGER DEFAULT 0,
  streams INTEGER DEFAULT 0,
  dists JSONB DEFAULT '[]',
  file_url TEXT
);

-- Payouts table
CREATE TABLE payouts (
  id SERIAL PRIMARY KEY,
  aId UUID REFERENCES users(id),
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  at TEXT NOT NULL,
  method TEXT NOT NULL
);

-- Create storage bucket for music files
INSERT INTO storage.buckets (id, name, public) VALUES ('music-files', 'music-files', false);

-- Storage policies
CREATE POLICY "Artists can upload own files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'music-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Artists can view own files" ON storage.objects FOR SELECT USING (bucket_id = 'music-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Artists can update own files" ON storage.objects FOR UPDATE USING (bucket_id = 'music-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Artists can delete own files" ON storage.objects FOR DELETE USING (bucket_id = 'music-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policies for users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Policies for releases
CREATE POLICY "Artists can view own releases" ON releases FOR SELECT USING (auth.uid() = aId);
CREATE POLICY "Artists can insert own releases" ON releases FOR INSERT WITH CHECK (auth.uid() = aId);
CREATE POLICY "Artists can update own releases" ON releases FOR UPDATE USING (auth.uid() = aId);

-- Policies for payouts
CREATE POLICY "Artists can view own payouts" ON payouts FOR SELECT USING (auth.uid() = aId);
CREATE POLICY "Artists can insert own payouts" ON payouts FOR INSERT WITH CHECK (auth.uid() = aId);

-- For admin, allow all
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can view all releases" ON releases FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update releases" ON releases FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can view all payouts" ON payouts FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update payouts" ON payouts FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));