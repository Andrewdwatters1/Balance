DELETE FROM todos
WHERE id = $1;

SELECT * FROM todos

WHERE userId = $2

ORDER BY id;