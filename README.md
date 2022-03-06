# Getting Started with Create React App

This project is a test app using the public API of [breaking bad](https://www.breakingbadapi.com/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech stack
- React
- Typescript
- Context / Hooks
- Cypress

## Project Structure
- /components (containing app specific and common components)
- /config (folder with app config as application routes and backend url by environment)
- /context 
  -  CharactersProvider (context containing all characters logic and data access)
  -  BackdropProvider (context to show a loading spinner)
- /hooks (useApi hook for data fetching)
- /i18n (folder with locale configuration)
- /models (folder containing typescript interfaces)
- /pages (pages of the application)
- /utils (different helpers functions)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npx cypress open`

Launches e2e tests in a new browser.
Please check [Cypress](https://www.cypress.io/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

