insert into scratchpad(userid, title, content, date)
values ($1, $2, $3 , current_timestamp);

SELECT * FROM scratchpad
where userid = $1;