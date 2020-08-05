update home_users
set age = $2, income = $3, married = $4, employed= $5, email= $6
where id = $1;