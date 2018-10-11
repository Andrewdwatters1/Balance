DELETE FROM Notes
WHERE id = $1;
SELECT * FROM Notes
where userid = $2
order by desc;