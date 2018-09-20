insert into todos(userId,content,date, completed)

values ($1,$2, now(), false)

SELECT * FROM todos

WHERE userId = $1;