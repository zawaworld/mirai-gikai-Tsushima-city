-- 議案に関する発言。所属・肩書きは発言時点の記録として保持する。
create table public.bill_speeches (
  id uuid primary key default gen_random_uuid(),
  bill_id uuid not null references public.bills(id) on delete cascade,
  speaker_name text not null check (char_length(btrim(speaker_name)) between 1 and 100),
  speaker_role text not null default '議員' check (char_length(btrim(speaker_role)) between 1 and 100),
  party_name text not null default '' check (char_length(party_name) <= 100),
  faction_name text not null default '' check (char_length(faction_name) <= 100),
  meeting_date date not null,
  meeting_name text not null check (char_length(btrim(meeting_name)) between 1 and 200),
  speech_type text not null check (speech_type in ('debate', 'question', 'answer', 'explanation')),
  stance text not null default 'unspecified' check (stance in ('support', 'oppose', 'unspecified')),
  summary text not null default '' check (char_length(summary) <= 2000),
  content text not null check (char_length(btrim(content)) between 1 and 100000),
  source_title text not null check (char_length(btrim(source_title)) between 1 and 300),
  source_url text not null check (source_url ~ '^https?://' and char_length(source_url) <= 2000),
  source_locator text not null default '' check (char_length(source_locator) <= 300),
  sort_order integer not null default 0 check (sort_order between 0 and 10000),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bill_speeches_stance_type check (speech_type = 'debate' or stance = 'unspecified')
);

alter table public.bill_speeches enable row level security;
-- anon/authenticated向けポリシーは作らない。認可済みサーバーだけがアクセスする。
grant select, insert, update, delete on public.bill_speeches to service_role;
create index bill_speeches_bill_order_idx
  on public.bill_speeches (bill_id, is_published, meeting_date, sort_order, id);
create trigger set_bill_speeches_updated_at before update on public.bill_speeches
  for each row execute function public.update_updated_at_column();
