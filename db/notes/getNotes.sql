SELECT * FROM Notes
where userid = $1
order by date desc;