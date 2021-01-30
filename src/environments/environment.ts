// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDe1f4AnJdJZNJdni7JYYvIqtMe0SWsGok",
    authDomain: "seljantrack.firebaseapp.com",
    projectId: "seljantrack",
    storageBucket: "seljantrack.appspot.com",
    messagingSenderId: "940063634074",
    appId: "1:940063634074:web:8e8919a84095e5b4c8a523",
    measurementId: "G-CW2QDZ499S"
  },
  firebase_auth: {
    // authGuardFallbackURL: 'login',
    // authGuardLoggedInURL: 'tournament-list',
    // guardProtectedRoutesUntilEmailIsVerified: false,
    // enableEmailVerification: false, 
    // passwordMinLength: 8
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
