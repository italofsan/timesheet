## Timesheet App


## Description

This is a frontend project coded by Italo Santos. This web app controls the working hours for a company's employees. The employees can register arrival, exit ,and lunch break times. They can also see the amount of hours above or below the expected working hours . The expected  amount of working hours is eight per day.

It is possible to see a production preview https://italofsan-timesheet.netlify.app

## Setup

```bash
  # To run this project follow the steps below

  # Open CMD
  # Put these commands at the command prompt 

  # Clone this repository:
  $ git clone https://github.com/italofsan/timesheet-app.git

  # Go to the folder:
  $ cd timesheet-app

  # Install all dependencies:
  $ yarn

  # See development preview
  $ yarn start
```

## Website
![Homepage](https://user-images.githubusercontent.com/66754958/125202710-31270f00-e24b-11eb-9473-d9fa121beb07.png)
![App](https://user-images.githubusercontent.com/66754958/125202713-3c7a3a80-e24b-11eb-8f69-b30a06dd0f48.png)

## Mobile Responsive Website
![Homepage-Responsive](https://user-images.githubusercontent.com/66754958/127085053-98647c88-985d-43b9-8e8a-55aaab13dc14.png)
![App-Responsive](https://user-images.githubusercontent.com/66754958/127085267-20d363a2-e63b-4143-9ccc-c40130a4166c.png)

## Technologies
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://material-ui.com)
- [React Router Dom](https://reactrouter.com/web/guides/quick-start)
- [React Number Format](https://github.com/s-yadav/react-number-format#readme)
- [Formik](https://formik.org/docs/overview)
- [Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Yup](https://github.com/jquense/yup#readme)
- [Axios](https://github.com/axios/axios#readme)

## Testing Tools
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Deployment](#deployment)
  - [Static Server](#static-server)
  - [Firebase](#firebase)
  - [Netlify](#netlify)

## Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```

### Firebase

Install the Firebase CLI if you haven’t already by running `npm install -g firebase-tools`. Sign up for a [Firebase account](https://console.firebase.google.com/) and create a new project. Run `firebase login` and login with your previous created Firebase account.

Then run the `firebase init` command from your project’s root. You need to choose the **Hosting: Configure and deploy Firebase Hosting sites** and choose the Firebase project you created in the previous step. You will need to agree with `database.rules.json` being created, choose `build` as the public directory, and also agree to **Configure as a single-page app** by replying with `y`.

```sh
    === Project Setup

    First, let's associate this project directory with a Firebase project.
    You can create multiple project aliases by running firebase use --add,
    but for now we'll just set up a default project.

    ? What Firebase project do you want to associate as default? Example app (example-app-fd690)

    === Database Setup

    Firebase Realtime Database Rules allow you to define how your data should be
    structured and when your data can be read from and written to.

    ? What file should be used for Database Rules? database.rules.json
    ✔  Database Rules for example-app-fd690 have been downloaded to database.rules.json.
    Future modifications to database.rules.json will update Database Rules when you run
    firebase deploy.

    === Hosting Setup

    Your public directory is the folder (relative to your project directory) that
    will contain Hosting assets to uploaded with firebase deploy. If you
    have a build process for your assets, use your build's output directory.

    ? What do you want to use as your public directory? build
    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ✔  Wrote build/index.html

    i  Writing configuration info to firebase.json...
    i  Writing project information to .firebaserc...

    ✔  Firebase initialization complete!
```

Now, after you create a production build with `npm run build`, you can deploy it by running `firebase deploy`.

```sh
    === Deploying to 'example-app-fd690'...

    i  deploying database, hosting
    ✔  database: rules ready to deploy.
    i  hosting: preparing build directory for upload...
    Uploading: [==============================          ] 75%✔  hosting: build folder uploaded successfully
    ✔  hosting: 8 files uploaded successfully
    i  starting release process (may take several minutes)...

    ✔  Deploy complete!

    Project Console: https://console.firebase.google.com/project/example-app-fd690/overview
    Hosting URL: https://example-app-fd690.firebaseapp.com
```

For more information see [Add Firebase to your JavaScript Project](https://firebase.google.com/docs/web/setup).

## Netlify

**To do a manual deploy to Netlify’s CDN:**

```sh
npm install netlify-cli
netlify deploy
```

Choose `build` as the path to deploy.

**To setup continuous delivery:**

With this setup Netlify will build and deploy when you push to git or open a pull request:

1. [Start a new netlify project](https://app.netlify.com/signup)
2. Pick your Git hosting service and select your repository
3. Click `Build your site`

**Support for client-side routing:**

To support `pushState`, make sure to create a `public/_redirects` file with the following rewrite rules:

```
/*  /index.html  200
```

When you build the project, Create React App will place the `public` folder contents into the build output.
