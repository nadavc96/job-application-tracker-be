CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    user_name TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
)