## Start:
Initialize mongo on localhost 27017

npm install

npm run start

## Functions
### Signup
```
POST /users 
{
    "email": ...,
    "password": ....
}
```
### Login
```
POST /users/login
{
    "email": ...,
    "password": ....
}
```