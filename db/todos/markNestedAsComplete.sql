UPDATE nestedTodos
SET completed = true
WHERE id = $1;

SELECT * FROM nestedTodos
WHERE userid = $2
ORDER BY id;