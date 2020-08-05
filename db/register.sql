insert into home_users(
name, email, password
)values(
$1,$2,$3
)

returning name, email;