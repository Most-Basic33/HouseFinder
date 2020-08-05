 insert into home_users(
 name, age, married, employed, income
)values(
 $1,$2,$3,$4,$5
 );

 returning *;