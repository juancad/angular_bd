import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  //registrarse en la aplicación mediante firebase
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  //loguearse en la aplicación mediante firebase
  login( { email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //loguearse con una cuenta de google
  loginWithGoogle () {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
