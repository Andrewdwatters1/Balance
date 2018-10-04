UPDATE users
SET avitar = $2
WHERE id = $1
RETURNING *