DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
 /* Describe your table here.*/
 id int not null auto_increment primary key,
 name varchar(30)
);
CREATE TABLE messages (
 /* Describe your table here.*/
 id int not null auto_increment primary key,
 userId int,
 FOREIGN KEY (userId) REFERENCES users(id),
 text varchar(300),
 created_at varchar(30),
 roomname varchar(30)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
