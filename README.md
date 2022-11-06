# to-do-list

Application used to create a task list, that is stored and allows to be updated ( check/uncheck tasks and delete them)

## Getting Started

This application is stored in a folder named to-do-list and consists of two main folders, fronted/ and backend/.

Both parts are necessary for our application to work.

The frontend/ part is based on Ionic and contains the files needed to start the user interface of our program.

The backend/ part contains our API built on top of ExpressJS and Sequelize. This part acts as an interface between the frontend application and the MySQL database.

The backend API can also be tested using the postman requests https://www.postman.com/josean101/workspace/pgl/collection/3092222-77dfdcf4-9104-4cc0-be6f-8de0e71a2535?action=share&creator=3092222 


### Prerequisites

This application runs primarily on a nodejs server of at least version 16.x.
https://nodejs.org/dist/v16.17.1/node-v16.17.1-x64.msi

Data storage also requires a MySQL database running on a server.
Both can be downloaded from Oracle's website https://dev.mysql.com/

By default you will need to have a 'db_tasks' database hosted on 'localhost'.
The access will be done using the user 'root' with the password 'sasa'.
All these configurations can be modified within the /backend/config/db.config.js file.

If the backend of the application is to be started in an environment other than localhost, it will also be necessary to modify the BASE_URL constant in the /fontend/src/app/app.constants.ts file.

The rest of the dependencies will be installed directly using the package.json files included in the applications via the npm package manager.


### Installing

1. Run the server with the MySQL database that you have choosen.
2. Access the backend folder and install the required packages.

```
    cd backed
    npm i
```
3. You need to create a .env file in the /backend folder with a key for the JWT and the data for the connection to your MySQL Server:
```
    JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

    MYSQL_DATABASE=db_tasks
    MYSQL_USER=root
    MYSQL_PASSWORD=sasa
    MYSQL_ROOT_PASSWORD=sasa

    DB_HOST=localhost

    NODE_ENV=development
```
4. Since empty folder are not present on git repository you will need to create a public/images folder on you backend folder.

5. Run the backend API, it will drop the database.

```
    node index.js
```
6. Access the frontend folder and install the packages.

```
    cd ../frontend
    npm i
```

7. Run the ionic aplication

```
    ionic serve
```


## Authors

* **José Antonio Jaramago Lozano** - *Initial work* - (https://github.com/Josillo/to-do-list)



## License



