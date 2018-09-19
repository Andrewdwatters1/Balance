DELETE FROM todos
WHERE id = $1
SELECT * from todos