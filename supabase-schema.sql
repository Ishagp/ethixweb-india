-- 1. Table schema
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(160) NOT NULL,
    service VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- 3. Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Drop any loose policies if re-running
DROP POLICY IF EXISTS "Service role full access on leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated admins can update leads" ON public.leads;

-- 5. Service Role Key full access (for secure server-side route handlers)
CREATE POLICY "Service role full access on leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 6. Authenticated Admins Policy
-- Any user who has verified credentials in Supabase Auth (authenticated role)
-- can view and update leads in the dashboard.
CREATE POLICY "Authenticated admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Public / Anon strict security
-- Ensure public anonymous users cannot read or update private leads
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon;
