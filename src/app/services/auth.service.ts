import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.logUserDetails();
  }

  private updateUserData(user: User) {
    const userRef = this.afs.doc<User>(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    if (credential.user !== null) {
      return this.updateUserData(credential.user);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    console.log('Signed out');
    return this.router.navigate(['/']);
  }

  async logUserDetails() {
    console.log(
      'User details: ',
      this.user$.subscribe((user) => {
        console.log('User details: ', user ? user : 'No user');
      })
    );
  }

  public get user(): User | null | undefined {
    this.user$.subscribe((user) => {
      return user;
    });
    return null;
  }
}
