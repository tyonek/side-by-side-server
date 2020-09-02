# Side by Side 
* This app uses the React, Node, Express, PostgreSQL stack.
* Live: https://side-by-side.vercel.app/
* Front-end: https://github.com/tyonek/side-by-side

## Description
This end point provides information for Side by Side client side. Users are able to POST(add) products. Users are also able to GET products.
To make a POST request users must be logged in via AUTH.

## Set Up
First install the package

### npm i or npm install
Setup .env files (For local use)

### postgresql://postgres@localhost/sidebyside
Run server
### npm run dev or npm start

## Endpoints 
**/api/users**
- Gets the user info
- Post the user info 
- Update the user info

**api/products**
- Gets the products info
- Post the products info
- Update the products info
- Delete the products info

**api/auth/login**
- Post the user info and verify user info for login
