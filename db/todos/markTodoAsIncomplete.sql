UPDATE todos
SET completed = false
WHERE id = $1;

SELECT * FROM todos

WHERE userid = $2

ORDER BY id;