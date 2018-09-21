UPDATE events
SET event_date = $3,
event_formatted_date = $4,
event_time = $5,
event_importance = $6,
event_name =$7,
event_details = $8
WHERE user_id = $2 AND event_id = $1
RETURNING *;