INSERT INTO nestedTodos(parenttodoid, userid, content, date, completed)
VALUES($1, $2, $3, now(), false);


SELECT * FROM nestedTodos

WHERE parenttodoid = $1

order by id;