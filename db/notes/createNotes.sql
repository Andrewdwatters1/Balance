insert into Notes(userid, title, content, date)
values ($1, $2, $3 , current_timestamp);

SELECT * FROM Notes
where userid = $1
order by desc;