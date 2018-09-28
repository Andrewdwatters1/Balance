UPDATE todos
SET content = $1
WHERE id = $2;

select * from todos
where userid = $3
order by id;