# My first backend
## Installation
Clone this repository and go into folder `server`
```
git clone https://github.com/etteryand0/first-backend
cd first-backend/server
```
Install project dependencies `express, mongoose, morgan, nodemon`
```
npm install
```
Create and open file "nodemon.json". This is your nodemon configuration file. Insert your MongoDB cluster link
```
{
  "env": {
    "MONGODB_LINK": "mongodb+srv://<user>:<password>@users.cy0ou.mongodb.net/<db_name>?retryWrites=true&w=majority"
  }
}
```
You're good to go! Now let's run project
```
npm run dev
```

# Documentation
## Routes
localhost:3000/
  - products/
    - :productId

## Implementations
### /products/
---------------------------------------------------
Method: GET <br>
  Returns list of first 20 products from Database


Method: POST <br>
  Data:
  ```
  {
    "name": String (maxlength: 50),
    "price": Number (min: 0),
  }
  ```
  Creates new product with given data <br>
  Returns product Object and additionally request object with url to details of product



### /products/:productId
---------------------------------------------------
Method: GET <br>
  Returns product Object


Method: DELETE <br>
  Deletes product from database

Method: PATCH <br>
  Data:
  ```
  [
    {"propName":"name", "value": "newNameOfProduct"},
    {"propName":"price", "value": 11010101}
  ]
  ```
  Changes data of product. <br>
  Implementation maps through Data, so you can change one or multiple values of product