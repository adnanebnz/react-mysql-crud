# React and MySQL CRUD operaions bookshop manager.


![React CRUD MySQL](https://res.cloudinary.com/dxobgdfyq/image/upload/w_700/v1675263079/project1_wjunxw.png)

![TEST](https://api.travis-ci.org/joemccann/dillinger.svg?branch=master&status=passed)

## Features

- Create, Delete,Modify a book by interacting with a sql database using a node express API.

## How to use : 

- make sure to create your own .env file in the backend folder and put the values respecting the .env.example file.
- run ```npm i``` on both backend and client folders.
- run ```npm run dev``` on the client folder and ```npm start``` on the server folder.
- make sure to create a database that has this structure : 

| COLUMN | ATTRIBUTES |
| ------ | ------ |
| id | INT, PRIMARY KEY, UNIQUE, AUTO INCREMENT |
| tilte | VARCHAR(45) |
| desc | VARCHAR(255) |
| price | INT, NOT NULL |
| cover | VARCHAR(45),UNIQUE |

## LICENCE

MIT.
