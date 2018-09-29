DELETE FROM habitsToday WHERE habitid = $1;
DELETE FROM habitEvents WHERE habitid = $1;
DELETE FROM habits where id = $1;