import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { User } from "../models/User.model";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    constructor(
        private firebaseAuth: AngularFireAuth,
        private db: AngularFirestore,
    ){ }

    login(email, password): Observable<any>{
        return from(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((authResponse: any)=> authResponse.user.uid),
        )
    }

    logout(): Observable<any> {
        return from(this.firebaseAuth.signOut());
    }

    register(firstName, lastName, email, password): Observable<string>{
        return from(this.firebaseAuth.createUserWithEmailAndPassword(email, password)).pipe(
            switchMap((authResponse)=> {
                let user: Omit<User, 'id'> = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                }
                return from(this.db.collection<any>('users')
                    .doc(authResponse.user.uid)
                    .set(user)).pipe(map(() => authResponse.user.uid))
            }),
        )
    }

    assignUserPrivileges(userId: string): Observable<boolean>{
       return from(this.db.collection<any>('roles').get()).pipe(
            map((res) => {
                return res.docs.map(r=>r.id).includes(userId);
            })
       );
    }

    getCurrentUser(): Observable<string>{
        return this.firebaseAuth.authState.pipe(
            map(({uid})=>uid),
        )
    }

    loadUsers(): Observable<any[]>{
        return from(this.db.collection<any>('users').get()).pipe(
            map((usersDB)=> usersDB.docs.map((user) => {
                return {
                    ...user.data(),
                    id: user.id
                }
            }))
        );
    }

}