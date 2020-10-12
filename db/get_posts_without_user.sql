SELECT hp.author_id, hp.title, hu.username, hu.profile_picture FROM helo_post hp
JOIN helo_user hu on hp.author_id = hu.user_id
WHERE hp.author_id != $1
ORDER BY hp.author_id DESC;