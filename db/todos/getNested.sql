SELECT * FROM nestedTodos

WHERE parenttodoid = $1

ORDER BY id;