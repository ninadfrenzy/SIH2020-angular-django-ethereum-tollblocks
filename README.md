# Description
This is the repository for SIH 2020 project by team tollblocks, which is a web application for effective toll processing and management, 
using a hybrid blockchain based stack to process toll payments and simulate a road contract, preventing corruption and increasing transparency, throughout 
the stakeholder chain from vehicle owner to government.

# Contributors
## Angular development
- Ninad Manjaramkar
- Snehal Naikare
- Vineet Shinde
## Django development
- Rohit Nawale
- Kaustubh Patil
- Disha Shinde

# Run Locally
## Pre requisites

- **node js & npm [LTS preferably].**

    For windows, the GUI based installer works well.

    For linux, install NVM to manage nodejs installations easily.

    [Node.js](https://nodejs.org/en/)

    [nvm-sh/nvm](https://github.com/nvm-sh/nvm)

- **Angular CLI**

    ```bash
    npm install -g @angular/cli
    ```

- **Python packages:**

    ```bash
    pip install Django==2.2
    ```

    ```bash
    pip install djangorestframework
    ```

    ```bash
    pip install django-cors-headers
    ```

    ```bash
    pip install pyjwt.
    ```

    ```bash
    pip install web3
    ```

- **MySQL server [workbench is optional, but recommended]**
    - **ubuntu**

    [How To Install MySQL on Ubuntu 18.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)

    - **windows**

    [MySQL :: MySQL and Windows :: 1 Installing MySQL on Microsoft Windows](https://dev.mysql.com/doc/mysql-windows-excerpt/5.7/en/windows-installation.html)

- **Postman [optional but recommended]**

[Postman | The Collaboration Platform for API Development](https://www.postman.com/)

## Frontend

**install angular CLI using npm.**

```bash
npm install -g @angular/cli
```

**Clone the repository at a convenient location.**

**Open cmd/bash and navigate to 
tollblocks-webapp/client/ folder inside cloned repository.**

**Perform npm install.**

```bash
npm install
```

**run the command npm start to start the angular server.**

```bash
npm start
```

## Backend

**[Optional] Create a virtual environment, and activate it.**

**install prerequisite packages using pip. (refer prerequisites)**

**Clone the repository at a convenient location.**

**Open cmd/bash and navigate to backend_root folder inside cloned repository.**

**Delete migrations folder if exists.**

**Before proceeding to next step, ensure all database steps are done**.

**make migrations**

**migrate**

**runserver**

```bash
python manage.py makemigrations testing
python manage.py migrate
python manage.py runserver 8080
```

## Database

**create a database(schema) for toll_blocks.**

**create a new user with name and credentials.**

**grant privileges to user created.**

**Flush.**

```sql
CREATE DATABASE toll_blocks;
CREATE USER 'dbadmin' identified by ‘password’;
GRANT ALL ON toll_blocks.* to 'dbadmin'@'%';
FLUSH PRIVILEGES;
```
## Create a ministry user
run postman and send a request to the endpoint localhost:8080/test/api/addministry with payload 
```
{
    name: "some name",
    email: "ministry",
    password: "some password",
    
}
```
