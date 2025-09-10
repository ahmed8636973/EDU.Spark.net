-- users table
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text default 'student',
  device_id text
);

-- packages table
create table packages (
  id uuid primary key default gen_random_uuid(),
  title text not null
);

-- subpackages table
create table subpackages (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references packages(id) on delete cascade,
  title text not null,
  video_url text not null
);

-- Admin account
insert into users (email, role, device_id)
values ('ahmed8636973@gmail.com', 'admin', null);