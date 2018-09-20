DELETE FROM Notes
WHERE id = $1;
SELECT * FROM Notes
where userid = $2;