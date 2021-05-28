**Install**

npm install

## Run the app

npm start

# **CRUD API**

This CRUD API is used to manipulate the data of the following dataset
given by the company

## Create User Account (Sign Up)

**Request:** POST /api/v1/users/signup

**Response:**

{

\"status\": \"success\",

\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWZkMzlmMWU2NjZkMmNiYzUzYmNlOCIsImlhdCI6MTYyMjEzNTcxMiwiZXhwIjoxNjI5OTExNzEyfQ.-vG0sVOWBux2NY2XDVx8_BpU3l0G1qg-YHMkqr_ZDr4\",

\"data\": {

\"user\": {

\"photo\": \"default.jpg\",

\"role\": \"user\",

\"active\": true,

\"\_id\": \"60afd39f1e666d2cbc53bce8\",

\"name\": \"admin\",

\"email\": \"admin\@gmail.com\",

\"\_\_v\": 0

}

}

}

![](media/image1.png){width="6.5in" height="3.4159722222222224in"}

## Login into user account (Login)

**Request:** POST /api/v1/users/login

**Response:**

{

\"status\": \"success\",

\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWZkMzlmMWU2NjZkMmNiYzUzYmNlOCIsImlhdCI6MTYyMjEzNTg5NywiZXhwIjoxNjI5OTExODk3fQ.yNQswteycUULVNTb64RpJE_fYkPfF9vPx4KUIJUmg28\",

\"data\": {

\"user\": {

\"photo\": \"default.jpg\",

\"role\": \"user\",

\"\_id\": \"60afd39f1e666d2cbc53bce8\",

\"name\": \"admin\",

\"email\": \"admin\@gmail.com\",

\"\_\_v\": 0

}

}

}

![](media/image2.png){width="6.5in" height="3.3819444444444446in"}

## Logout of user account (Logout)

**Request:** GET /api/v1/users/logout

**Response:**

{

\"status\": \"success\"

}

![](media/image3.png){width="6.5in" height="3.4055555555555554in"}

## Delete the current user

You must be logged in to delete the account

**Request:** DELETE /api/v1/users/deleteMe

**Response:** 204 No content

![](media/image4.png){width="6.5in" height="3.4159722222222224in"}

## Route to upload bulk data from excel sheet

You must be logged in

**Request:** POST /api/v1/data

**Response:**

{

\"status\": \"success\"

}

![](media/image5.png){width="6.5in" height="3.433333333333333in"}

## Get all data

You must be logged in

**Request:** GET /api/v1/data

**Response:**

{

\"status\": \"success\",

\"results\": 2,

\"data\": {

\"data\": \[

{

\"\_id\": \"60afd69f7dfdf04dc058451c\",

\"device\": \"test\\\"\",

\"t\": \"2021-03-02T00:21:32.000Z\",

\"w\": 0,

\"h\": \"SE\",

\"p1\": 0,

\"p25\": 0,

\"p10\": 0

![](media/image6.png){width="6.5in" height="3.397222222222222in"}

## Get all user data

You must be logged in and must have admin role

**Request:** GET /api/v1/users

**Response:**

{

\"status\": \"success\",

\"results\": 1,

\"data\": {

\"data\": \[

{

\"photo\": \"default.jpg\",

\"role\": \"admin\",

\"\_id\": \"60afd7f57dfdf04dc05869fc\",

\"name\": \"admin\",

\"email\": \"admin\@gmail.com\"

}

\]

}

}

![](media/image7.png){width="6.5in" height="3.446527777777778in"}

## Add a way to filter the data according to a time-range

You must be logged in

**Request:**

GET /api/v1/data?fromDate=21/03/19,09:01:46&toDate=21/03/19,12:18:37

(In fromDate you should enter date to search from and in toDate you should enter the date to end the search)

**Response:**

{

\"status\": \"success\",

\"results\": 30,

\"data\": {

\"data\": \[

{

\"\_id\": \"60afd69c7dfdf04dc0583acd\",

\"device\": \"DeviceA\",

\"t\": \"2021-03-19T03:31:46.000Z\",

\"w\": 2,

\"h\": \"SE\",

\"p1\": 30,

\"p25\": 48,

\"p10\": 62

},

![](media/image8.png){width="6.5in" height="3.341666666666667in"}

## Route to pull pm1, pm2.5 and pm10 values separately for all specified devices

You must be logged in

**Request:** GET /api/v1/data?fields:p1,p25,p10&device=test"

(In fields you should enter the columns to be display and in device you should enter device name )

**Response:**

{

\"status\": \"success\",

\"results\": 2,

\"data\": {

\"data\": \[

{

\"\_id\": \"60afd69f7dfdf04dc058451c\",

\"p1\": 0,

\"p25\": 0,

\"p10\": 0

},

{

\"\_id\": \"60afd6a87dfdf04dc05864cc\",

\"p1\": 0,

\"p25\": 0,

\"p10\": 0

}

\]

}

}

![](media/image9.png){width="6.5in" height="3.4055555555555554in"}

## Route to pull pm1, pm.25 and pm10 values separately for a single device

You must be logged in

**Request:** GET /api/v1/data?fields=p1,p25,p10&\_id= 60b0916f6233670d8c5c4f1f

(In \_id you should enter mongoDB datas document id)

**Response:**

    "status": "success",
    "results": 1,
    "data": {
        "data": [
            {
                "_id": "60b0916f6233670d8c5c4f1f",
                "p1": 30,
                "p25": 48,
                "p10": 62
            }
        ]
    }

}

![](media/image11.png){width="6.5in" height="3.4402777777777778in"}

## Route to pull data for specified device

You must be logged in

**Request:** GET /api/v1/data?device=test"

(In device you should enter the name of the device)

**Response:**

{

\"status\": \"success\",

\"results\": 2,

\"data\": {

\"data\": \[

{

\"\_id\": \"60afd69f7dfdf04dc058451c\",

\"device\": \"test\\\"\",

\"t\": \"2021-03-02T00:21:32.000Z\",

\"w\": 0,

\"h\": \"SE\",

\"p1\": 0,

\"p25\": 0,

\"p10\": 0

},

{

\"\_id\": \"60afd6a87dfdf04dc05864cc\",

\"device\": \"test\\\"\",

\"t\": \"2021-03-02T00:21:32.000Z\",

\"w\": 0,

\"h\": \"SE\",

\"p1\": 0,

\"p25\": 0,

\"p10\": 0

}

\]

}

}

![](media/image10.png){width="6.5in" height="3.4402777777777778in"}

## HAVE ALSO EXECUTED DOCKER FOR THIS API

**Response:**

![](media/image12.png){width="6.5in" height="3.4402777777777778in"}
