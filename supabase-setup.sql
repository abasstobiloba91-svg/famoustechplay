-- FamousTechPlay Database Setup
-- Run this in Supabase SQL Editor

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'artist' CHECK (role IN ('artist','admin')),
  plan TEXT NOT NULL DEFAULT 'Free' CHECK (plan IN ('Free','Pro')),
  av TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Releases table
CREATE TABLE IF NOT EXISTS releases (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'Single',
  genre TEXT,
  status TEXT DEFAULT 'pending_review' CHECK (status IN ('pending_review','approved','distributed','rejected')),
  earnings NUMERIC DEFAULT 0,
  streams BIGINT DEFAULT 0,
  audio_url TEXT,
  cover_url TEXT,
  dsps TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','rejected')),
  method TEXT DEFAULT 'bank',
  bank_name TEXT,
  account_number TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promo requests table
CREATE TABLE IF NOT EXISTS promo_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  artist_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','done')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage buckets (run separately in Supabase dashboard if needed)
-- Create buckets: "music" and "covers" in Storage

-- Row Level Security
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases      ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_requests ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "profiles_select"  ON profiles;
DROP POLICY IF EXISTS "profiles_insert"  ON profiles;
DROP POLICY IF EXISTS "profiles_update"  ON profiles;
DROP POLICY IF EXISTS "releases_all"     ON releases;
DROP POLICY IF EXISTS "payouts_all"      ON payouts;
DROP POLICY IF EXISTS "promos_all"       ON promo_requests;

-- Profiles: users can read/write own, admin can read all
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Releases: users manage own, admin manages all
CREATE POLICY "releases_all" ON releases FOR ALL USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Payouts: users manage own, admin manages all
CREATE POLICY "payouts_all" ON payouts FOR ALL USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Promo requests: users manage own, admin manages all
CREATE POLICY "promos_all" ON promo_requests FOR ALL USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
