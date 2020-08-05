create table home(
id serial primary key,
name varchar(40),
address varchar(60),
city varchar(40),
state varchar(20),
zip varchar(5)
)
//ran this afterwards
alter table home
add column photo VARCHAR(500);

CREATE table home_users(
id serial primary key,
home_id serial references home(id),
name varchar(60),
age varchar(3),
married varchar(5),
employed varchar(5),
income int,
isAdmin boolean

);