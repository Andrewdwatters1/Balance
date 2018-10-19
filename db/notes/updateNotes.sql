UPDATE notes
SET title = $3,
content = $5
WHERE userId = $2 AND id = $1;
SELECT * FROM notes
WHERE userId = $2
Order by id ;