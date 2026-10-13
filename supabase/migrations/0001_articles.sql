-- NOVIA STUDIO: journal articles + admin allowlist with Row Level Security.
-- Run once in Supabase Dashboard > SQL Editor.

create type public.article_status as enum ('draft', 'published', 'archived');

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  body text not null default '',
  excerpt text not null default '',
  cover_image_path text,
  cover_image_alt text not null default '',
  category text,
  tags text[] not null default '{}',
  status public.article_status not null default 'draft',
  featured_on_home boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  constraint published_requires_date check (status <> 'published' or published_at is not null)
);

create index articles_public_idx on public.articles (status, published_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

-- Only users listed here can manage articles. Add rows via SQL Editor only.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.articles enable row level security;

create policy "Public can read published articles"
on public.articles for select
to anon, authenticated
using (status = 'published' and published_at <= now());

create policy "Admins can read all articles"
on public.articles for select
to authenticated
using ((select public.is_admin()));

create policy "Admins can insert articles"
on public.articles for insert
to authenticated
with check ((select public.is_admin()));

create policy "Admins can update articles"
on public.articles for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins can delete articles"
on public.articles for delete
to authenticated
using ((select public.is_admin()));

grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;
