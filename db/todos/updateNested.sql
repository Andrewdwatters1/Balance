UPDATE nestedTodos
SET content = $1
WHERE id = $2;

select * from nestedTodos
where parenttodoid = $3
order by id;