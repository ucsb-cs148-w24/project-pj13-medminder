## Instructions for Deploying via Firebase Hosting
- Copy / fork our repository
- From the root directory, install dependecies and build
```console
cd medminder
npm install
npm run build
```
- Create a Firebase Project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Install and set up Firebase CLI, using the same Google account
```console
npm install -g firebase-tools
firebase login
```
- Initialize Firebase Hosting and Deploy
```console
firebase init
firebase deploy
```

For further help, please see [detailed instructions](https://create-react-app.dev/docs/deployment/#firebase)
