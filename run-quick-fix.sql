-- Run this in Supabase SQL Editor to fix everything
INSERT INTO users (id, email, name, "createdAt", "updatedAt") 
VALUES ('temp-user-id', 'demo@freelancecrm.com', 'Demo User', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;