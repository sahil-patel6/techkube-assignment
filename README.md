## Techkube Assignment

The task was to create a **simple authentication system** where in there will be signup, signin, signout and a protected route. I had to use session management to authenticate different requests. Frontend used is **Angular** and backend is using **Node.js with MongoDB**.

### Frontend

I created angular project using angular cli and added angular router for navigation throughout the web app. I also added bootstrap for styling purposes. I created 4 components: 
 1) **Home**: This is actual protected route meaning if the user is signed in then it will show a list of dummy products by http get request from backend API. If the user is not signed in then it will show a message telling the user to signin.
 2) **Signin**: This is used to signin. All the validations are in place. If the use does not exist with the given username it shows error memssage "invalid credentials" so that even hacked should not know that the user does not exist.
 3) **Signup**: Similar to signin, this is used to sign up the user. All the validations are in place. If the user is already signed up and tries to sign up again then it will show the error message saying "Email is in use".
 4) **Navbar**: This is used to show navbar on top. The navlinks are bold depending on the current route.

 I have also created two services: **data service** which will just get dummy products data from backend if the user is signed in and **user service** to handle sign in, sign up and sign out operations.

 ## Backend

I created an express app which connects to local mongo instance. I also used environment variables as to not leak confidential data. I have created custom error middlwares, validating request,etc. I have used express-validator package for validation. I have created required routes as well like currentuser to get the current signed in user, signup, signin and signout. I have also used **password hashing** to securely store passwords in DB.

## Installation Steps
#### Backend
  1) cd backend
  2) npm install
  3) add env variables for **JWT_KEY** and **MONGO_URI**
  4) npm run start
#### Frontend
  1) cd frontend
  2) npm install
  4) npm run start




