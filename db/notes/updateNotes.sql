UPDATE notes
SET title = $3,
date = $4,
content = $5,
WHERE user_id = $2 AND id = $1
RETURNING *;