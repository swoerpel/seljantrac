import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from "src/app/shared/models/User.model";
import { Order } from "src/app/shared/models/order.model";
import { UserApiActions, UserPageActions, UserRouterActions } from "./actions";
import { UserApiService } from "src/app/shared/services/user-api.service";
import { Router } from "@angular/router";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private router: Router,
        private userApiService: UserApiService,
    ){ }

    init$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => [
                UserRouterActions.LoadCurrentUser(),
                UserRouterActions.LoadUsers(),
            ])
        );
    })


    loadCurrentUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserRouterActions.LoadCurrentUser),
            switchMap(()=>{
                return this.userApiService.getCurrentUser().pipe(
                    map((currentUserId: string)=>UserApiActions.LoadCurrentUserSuccess({currentUserId})),
                    catchError((err) => of(UserApiActions.LoadCurrentUserError({err})))
                )
            })
        )
    })


    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.LoginUser),
            switchMap((action) => this.userApiService.login(action.email, action.password).pipe(
                map((userId: string) => {
                    this.router.navigate(['/home'])
                    return UserApiActions.LoginUserSuccess({currentUserId: userId});
                }),
                catchError((res) => of(UserApiActions.LoginUserError({err: res})))
            )),
        )
    });

    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.RegisterUser),
            switchMap((action) => this.userApiService.register(
                action.firstName, 
                action.lastName, 
                action.email, 
                action.password
            ).pipe(
                map((userId: string) => {
                    this.router.navigate(['/home'])
                    return UserApiActions.RegisterUserSuccess({currentUserId: userId})
                }),
                catchError((res) => of(UserApiActions.LoadUsersError({err: res})))
            )),
        )
    });

    loadUsers$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(
                UserRouterActions.LoadUsers,
                UserApiActions.LoginUserSuccess,
                UserApiActions.RegisterUserSuccess,
            ),
            switchMap((_) => {
                return this.userApiService.loadUsers().pipe(
                    map((users: User[]) => UserApiActions.LoadUsersSuccess({users})),
                    catchError((err) => of(UserApiActions.LoadUsersError({err})))
                )
            }),
            
        );   
    });

    logoutUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.LogoutUser),
            switchMap(() => this.userApiService.logout().pipe(
                map(() => UserApiActions.LogoutUser()),
                tap(() => this.router.navigate(['/login']))
            ))
        )
    });

    assignUserPrivileges$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                UserApiActions.LoginUserSuccess, 
                UserApiActions.RegisterUserSuccess,
                // ROUTER_NAVIGATED,
            ),
            switchMap((action) => {
                return this.userApiService.assignUserPrivileges(action.currentUserId).pipe(
                    map((isAdmin) => UserApiActions.AssignUserPrivileges({isAdmin: isAdmin})),
                )
            })
        )
    })






}