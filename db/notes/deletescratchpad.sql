DELETE FROM scratchpad
WHERE id = $1;
SELECT * FROM scratchpad
where userid = $2;