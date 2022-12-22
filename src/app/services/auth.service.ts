import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

    // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
    }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log('You have been successfully logged out!');
    });
  }

  GetStatus() {
    return this.afAuth.authState;
  }

  GetCurrentUser() {
    return this.afAuth.currentUser;
  }

}
