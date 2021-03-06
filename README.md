# UTN FRBA - React JS

Final project for React JS professional training course of UTN FRBA.

Preview: https://utn-react.federico.mahfoud.ar/

## Goal

Develop an ecommerce with the following pages:

- Home: list of 4 products with product detail (see below)
- Product detail: product name, description, price, SKU
- Register: fields Name, Surname, Email, Password
- Login: by email and password

All data must persist in database. The use of Firebase is optional. You can develop your own REST APIs.

## Features

- Single Page Application
- Firebase for data persistency
- Local Storage for local session persistency
- Simple and minimal CSS

## Configuration

A Firebase project with the Firestore Database module, the Authentication module and the Email/Password Sign-in provider enabled is required.

In order for this App to run, you need to set the proper environment variables for the Firebase project.

It can be done in a `.env` file inside the root directory. See [.env.example](.env.example) for an example and [Adding Custom Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) in the Create React App documentation for more information.

### Example environment configuration

```
REACT_APP_FIREBASE_API_KEY=AIzaSyBaqHA1ZIdAraX8FCxTkSIZufKxD0vsJm0
REACT_APP_FIREBASE_AUTH_DOMAIN=utn-reactjs-8ddb3.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=utn-reactjs-8ddb3
REACT_APP_FIREBASE_STORAGE_BUCKET=utn-reactjs-8ddb3.appspot.com
REACT_APP_FIREBASE_MESSAGERING_SENDER_ID=749649779873
REACT_APP_FIREBASE_APP_ID=1:749649779873:web:8ef6c4b40e57c3765ca4e0
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
