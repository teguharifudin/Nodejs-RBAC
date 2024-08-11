![](https://www.teguharief.com/img/teguh-arief.png)

# Node.js RBAC

Role-based Access Control (RBAC) in Node.js with JWT auth using MongoDB.

## Installation

Install the app on terminal

```
git clone git@github.com:teguharifudin/Nodejs-RBAC.git
```
```
cd Nodejs-RBAC
```
```
npm start
```

## Usage

POST http://localhost:5000/users/register
```
{
    "firstName": "User",
    "lastName": "XYZ",
    "email": "arief@gmail.com",
    "password": "@Pass123",
    "role": "User"
}
```

POST http://localhost:5000/users/authenticate
```
{
    "email": "arief@gmail.com",
    "password": "@Pass123"
}
```

GET Bearer Authentication http://localhost:5000/users/current

GET Bearer Authentication with RBAC http://localhost:5000/users

PUT Bearer Authentication http://localhost:5000/users/update/:id
```
{
    "firstName": "User",
    "lastName": "XYZ",
    "email": "arief@gmail.com",
    "password": "@Pass123",
    "role": "Admin"
}
```

DELETE Bearer Authentication http://localhost:5000/users/_delete/:id

## Contributing

Please use the [issue tracker](https://github.com/teguharifudin/Nodejs-RBAC/issues) to report any bugs or file feature requests.