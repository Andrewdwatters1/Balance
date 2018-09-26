insert into todos(userId,content,date, completed)
values ($1,$2, now(), false);

select * from todos
where userid = $1
order by id;