# Side by Side 
* This app uses the React, Node, Express, PostgreSQL stack.
* Live: https://side-by-side.vercel.app/
* Front-end Repo: https://github.com/tyonek/side-by-side

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

### Technologies
* Node
* PostgreSQL
* React
* Express

## Landing
User can Sign In, Sign Up, and View Products
![Image description](https://github.com/tyonek/side-by-side/blob/master/Screenshots/Landing.png)


## Post Product
User can Post a product to be viewed on the product page. The user must be signed in to post a product. Posting a product includes a product title, price, description, and a link to the product.
![Image description](https://github.com/tyonek/side-by-side/blob/master/Screenshots/Post.png)


## Product Page 
All products can be viewed in a list here. User does not need to be signed in to view.
![Image description](https://github.com/tyonek/side-by-side/blob/master/Screenshots/Product.png)


## Sign In
User can sign in if signed up.
![Image description](https://github.com/tyonek/side-by-side/blob/master/Screenshots/signin.png)


## Sign Up
User can sign up for an account to be able to post products.
![Image description](https://github.com/tyonek/side-by-side/blob/master/Screenshots/signup.png)


# Future Developments
* Search Products instead of View All to allow a user to search specific products of interest
* Comments section for users to socialize and conversate about products posted
* Single product page, to view a single product after searched, allowing users access to comments section
* Styling 
