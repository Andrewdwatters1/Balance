SELECT * FROM scratchpad
WHERE userId = $1
order by date desc;