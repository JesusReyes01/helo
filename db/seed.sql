create table if not exists helo_user (
    user_id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_picture text
);

create table if not exists helo_post (
    post_id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id int references helo_user(user_id)
);

ALTER TABLE helo_user
ALTER password
SET DATA TYPE text;

insert into helo_user (username,password,profile_picture)
values ('test user','password','https://upload.wikimedia.org/wikipedia/en/thumb/0/00/The_Child_aka_Baby_Yoda_%28Star_Wars%29.jpg/220px-The_Child_aka_Baby_Yoda_%28Star_Wars%29.jpg');

insert into helo_post (title, img, content, author_id)
values ('test post', 'https://images.unsplash.com/photo-1582125719844-90fb9d5c321a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' , 'test content ',3 );

insert into helo_post (title, img, content, author_id)
values ('test post 2', 'https://images.unsplash.com/photo-1602197165411-bcf986d773f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' , 'test content 2 ',2 );