UPDATE nestedTodos
SET completed = true
WHERE id = $1;

SELECT * FROM nestedTodos
WHERE parenttodoid = $2
ORDER BY id;