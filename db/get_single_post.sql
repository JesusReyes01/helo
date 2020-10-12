SELECT hp.title, hp.img, hp.content, hu.username, hu.profile_picture, hp.author_id, hp.post_id
FROM helo_post hp
JOIN helo_user hu ON hp.author_id = hu.user_id
WHERE hp.post_id = $1;