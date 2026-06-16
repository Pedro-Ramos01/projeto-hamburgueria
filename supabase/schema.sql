create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  address text not null,
  total_price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id text not null,
  product_title text not null,
  quantity integer not null,
  price decimal(10,2) not null
);

alter table orders enable row level security;
alter table order_items enable row level security;

grant usage on schema public to anon;
grant insert on table orders to anon;
grant insert on table order_items to anon;
grant select on table orders to anon;
grant select on table order_items to anon;

drop policy if exists "Permitir inserir pedidos" on orders;
drop policy if exists "Permitir inserir itens do pedido" on order_items;
drop policy if exists "Permitir ler pedidos" on orders;
drop policy if exists "Permitir ler itens do pedido" on order_items;

create policy "Permitir inserir pedidos"
on orders
for insert
to anon
with check (true);

create policy "Permitir inserir itens do pedido"
on order_items
for insert
to anon
with check (true);

create policy "Permitir ler pedidos"
on orders
for select
to anon
using (true);

create policy "Permitir ler itens do pedido"
on order_items
for select
to anon
using (true);
