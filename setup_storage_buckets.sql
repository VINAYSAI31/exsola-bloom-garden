-- 1. Ensure 'slides' bucket exists
insert into storage.buckets (id, name, public)
values ('slides', 'slides', true)
on conflict (id) do nothing;

drop policy if exists "Public View Slides" on storage.objects;
create policy "Public View Slides" on storage.objects for select using ( bucket_id = 'slides' );

drop policy if exists "Admin Manage Slides" on storage.objects;
create policy "Admin Manage Slides" on storage.objects for all using ( bucket_id = 'slides' and auth.role() = 'authenticated' );

-- 2. Ensure 'product-images' bucket exists (Used for Products, Workshops, Events, Blogs)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public View Product Images" on storage.objects;
create policy "Public View Product Images" on storage.objects for select using ( bucket_id = 'product-images' );

drop policy if exists "Admin Manage Product Images" on storage.objects;
create policy "Admin Manage Product Images" on storage.objects for all using ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
