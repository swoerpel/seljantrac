import { Injectable } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Order } from "src/app/shared/models/order.model";
import { OrderApiService } from "src/app/shared/services/order-api.service";
import { OrderApiActions, OrderPageActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class OrderEffects {
    constructor( 
        private actions$: Actions,
        private orderApiService: OrderApiService,
    ){ 
 
    }

    createOrder$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderPageActions.CreateOrder),
            switchMap((action) => {
                return this.orderApiService.createOrder(action.order).pipe(
                    map((order: Order) => {
                        return OrderApiActions.CreateOrderSuccess({order});
                    }),
                    catchError((err)=>of(OrderApiActions.CreateOrderError({err})))
                )
            })
        )   
    });


}