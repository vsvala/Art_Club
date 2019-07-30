# ArtClub -Fullstack project


ArtClub website is the plattform where users can apply memberships for the club and search artists and artworks. Users can also find links to exhibitions and current painting weather from the link page.  Members  can see art clubs events and they are able to create and update their own MyPage. On Mypage members can write short indroduction about themselves and create their own picturegallery with 10 pictures for everybody to see. All pictures are also shown on the maingallery page. (Users can vote artworks by like button and see ten most liked paintings.)( Main page features every month some of the artwoks.) Admin can list registered users and approve their memberships. Admin can also create events for members to see.


[Art Club release in Heroku ](https://artclub-project.herokuapp.com)


[Link to backend](https://github.com/vsvala/Art_Club_back )

## Travis / Codecov

[![Build Status](https://travis-ci.org/vsvala/Art_Club.svg?branch=master)](https://travis-ci.org/vsvala/Art_Club) [![codecov](https://codecov.io/gh/vsvala/Art_Club/branch/master/graph/badge.svg)](https://codecov.io/gh/vsvala/Art_Club)



## Technologies

Frontend: React, JSX(Javascript)

Backend: NodeJS 

Database: MongoDB, [MongoDB Atlas](https://www.mongodb.com/)

Server: [Heroku](https://www.heroku.com/)

### Used libraries frontend

Eslint

Browser and server connections:
[Axios](https://github.com/axios/axios)
```npm install axios --save ```

dev server:
[JSON server](https://github.com/typicode/json-server)

```npm install json-server --save-dev```


State management:

[Redux-thunk](https://github.com/reduxjs/redux-thunk)		
```npm install --save redux-thunk```

Redux:
```npm install --save react-redux```

Navigation:

[React router](https://github.com/ReactTraining/react-router)   
```npm install --save react-router-dom```


Tyylit:

[react-bootsrap](https://react-bootstrap.github.io/) 		
```npm install --save react-bootstrap```	

Tets:

[jest-dom](https://www.npmjs.com/package/jest-dom)   
```npm install --save-dev react-testing-library jest-dom```

[enzyme](https://github.com/airbnb/enzyme) 
```npm install --save-dev enzyme enzyme-adapter-react-16```

End to end testing:

[cypress]()
```npm install --save-dev cypress```

Tools:
[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
```npm install --save redux-devtools-extension```

Date picker:
[React date picker](https://reactdatepicker.com/)
```npm install react-datepicker --save```

Read more:
```npm install --save read-more-react```
[read-more-react](https://www.npmjs.com/package/read-more-react)

### Used libraries backend

Framework for Node.js
[Express](http://expressjs.com/)
```npm install express --save ```

Automatic restart of application after changes'. 
[Nodemon](https://github.com/remy/nodemon)
```npm install --save-dev nodemon```

Middleware which allows request from other origins:
[Cors](https://github.com/expressjs/cors)
```npm install cors --save```

[Jsonwebtoken-kirjasto](https://github.com/auth0/node-jsonwebtoken), jonka avulla koodi pystyy generoimaan JSON web token -muotoisia tokeneja.
```npm install jsonwebtoken --save```

Body-parser
```npm install body-parser```

Multer for image data handling


Database:

[Mongoose](https://mongoosejs.com/index.html)
```npm install mongoose --save```

Enviromental variables:loads environment variables from a .env file into process.env
[Dotenv](https://github.com/motdotla/dotenv#readme)
```npm install dotenv --save```

Passwordhashing:
[bcrypt](https://github.com/kelektiv/node.bcrypt.js)

Validating unique values:
[mongoose-unique-validator](ttps://www.npmjs.com/package/mongoose-unique-validator)
```npm install --save mongoose-unique-validator```


## Documentation

[Manual]( )

[Software Requirements Specification]( )

[Design architecture]( )

[Testing]( )

[Heroku](https://github.com/vsvala/Art_Club/blob/master/documentation/heroku.md)

[Timesheet](https://github.com/vsvala/Art_Club/blob/master/documentation/timesheet.md)

## [License]()


## Commandline functionality

### Command line scripts for Front

You can run these commands in the project directory

```
npm start
```
Runs the application in the development mode. 
You can use the application in a browser by opening http://localhost:3000 
The page will reloaded when the code is edited.

```
npm build
```
Builds the application for production

```
npm test
```
Runs tests for the application

```
npm run test-coverage
```
Runs the tests and a report for test coverage

```
npm run lint
```
Checks the code for style deviations

### Command line scripts for Back

```
npm run watch
```
Runs the application in the development mode.
Uses a local development PostGresql database. 

```
npm start
```
Runs the application in the production mode.

```
npm test
```

Pushing application to Heroku server after making new build and  git committing

```git push heroku master```
