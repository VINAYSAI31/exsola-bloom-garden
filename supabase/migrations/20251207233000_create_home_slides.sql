create table if not exists home_slides (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  display_order integer default 0
);

-- RLS
alter table home_slides enable row level security;

create policy "Public can view slides"
  on home_slides for select
  using (true);

create policy "Admins can manage slides"
  on home_slides for all
  using (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role = 'admin'
    )
  );

-- Storage bucket for slides
insert into storage.buckets (id, name, public) 
values ('slides', 'slides', true)
on conflict (id) do nothing;

create policy "Public can view slide images"
  on storage.objects for select
  using ( bucket_id = 'slides' );

create policy "Admins can upload slide images"
  on storage.objects for insert
  with check (
    bucket_id = 'slides' AND
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role = 'admin'
    )
  );

create policy "Admins can delete slide images"
  on storage.objects for delete
  using (
    bucket_id = 'slides' AND
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role = 'admin'
    )
  );
