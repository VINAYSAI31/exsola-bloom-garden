-- Create the custom table for homepage slides
create table if not exists public.home_slides (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.home_slides enable row level security;

-- Policy: Allow public read access (everyone can see the slides)
create policy "Public Read Access"
  on public.home_slides for select
  using (true);

-- Policy: Allow authenticated users (admins) to insert, update, and delete
create policy "Admin Write Access"
  on public.home_slides for all
  using (auth.role() = 'authenticated');

-- Create a storage bucket for slides if it doesn't exist
insert into storage.buckets (id, name, public)
values ('slides', 'slides', true)
on conflict (id) do nothing;

-- Storage Policy: Allow public to view images
create policy "Public View Slides"
  on storage.objects for select
  using ( bucket_id = 'slides' );

-- Storage Policy: Allow authenticated users to upload/modify images
create policy "Admin Manage Slides"
  on storage.objects for all
  using ( bucket_id = 'slides' and auth.role() = 'authenticated' );
