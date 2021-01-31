import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from "src/app/shared/models/User.model";
import { Order } from "src/app/shared/models/order.model";
import { UserApiActions, UserRouterActions } from "./actions";
import { UserApiService } from "src/app/shared/services/user-api.service";

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor( 
        private actions$: Actions,
        private userApiService: UserApiService,
    ){ 
 
    }

    // init$ = createEffect(():any => {
    //     return this.actions$.pipe(
    //         ofType(ROOT_EFFECTS_INIT),
    //         switchMap(() => [
    //             UserRouterActions.LoadUsers(),
    //         ])
    //     );
    // })


}