UPDATE nestedTodos
SET completed = false
WHERE id = $1;

SELECT * FROM nestedTodos
WHERE userid = $2
ORDER BY id;