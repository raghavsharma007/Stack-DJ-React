clone the repo
### Three ways to run the app:
1. Basic way
2. docker compose (needs only docker environment)

## Basic way
```
$ cd backend
$ pip install -r requirements.txt
$ python manage.py runserver
$ cd ../frontend
$ npm install
$ npm start
```
app: http://locahost:3000

## Docker compose
```
$ docker-compose build
$ docker-compose up -d
```
open app at http://localhost:3000