# ng2-jspm-seed
Seed project for angular 2 with jspm and typescript.


## Install

1. clone the project

  ```
  git clone https://github.com/oferh/ng2-jspm-seed.git
  ```
2. Install global jspm 0.17

  ```
  npm install -g jspm@beta
  ```
3. Install local packages

  At the moment we need to maintain all packages with both npm and jspm mostly for working with IDE's that support typescript.
  ```
  npm install; jspm install
  ```

## Running the project

install http-server (it's possible to install any web server)
```
npm install -g http-server
```

Start the server in the project directory
```
$ http-server 
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.2.100:8080
  http://192.168.99.1:8080
Hit CTRL-C to stop the server
```

The project is now avilable in `http://localhost:8080`

## Bundle creation

Use jspm to create a bundle of the project
```
jspm bundle app/boot.ts app-bundle.js
```
