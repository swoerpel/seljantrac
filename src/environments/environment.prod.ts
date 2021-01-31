export const environment = {
  production: true,
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
    authGuardFallbackURL: 'login',
    authGuardLoggedInURL: 'create',
    guardProtectedRoutesUntilEmailIsVerified: false,
    enableEmailVerification: false, 
    passwordMinLength: 8
  }
};