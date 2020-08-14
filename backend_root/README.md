# SIH2020-backend-django
backend repo for sih 2020

## Django Setup
1. `(optional) create a virtual env using python and activate it.`
2. `pip install Django==2.2`
3. `pip install djangorestframework`
4. `pip install django-cors-headers`
5. `pip install pyjwt.`


## Mysql Workbench Setup : (ensure mysql server installed and running.)

### 1. Install mysql workbench and create new schema named 'toll_blocks'.

      
      CREATE DATABASE toll_blocks

### 2. Execute following queries in MySQL Shell/ Workbench:


      a. create user 'dbadmin' identified by ‘disha_shinde’;
      (this creates a user with username - dbadmin & password - disha_shinde)
      
      
      b. grant all on toll_blocks.* to 'dbadmin'@'%';
   
   
      c. flush privileges;
   
   
### 3. Open CMD for windows, Shell/ terminal on Linux/ Mac 
      pip install pymysql.


### 4. Run the following command to create required mysql tables in app folder:
    python manage.py makemigrations test
    
    python manage.py migrate
    
   all default django tables will be created in the schema.
 ## Running the server
 1. `python manage.py runserver 8080 <br> run django_server- Windows.bat if on windows. <br> run django-server- Linux if on linux based os`
