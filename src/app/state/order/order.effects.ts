import { Injectable } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Order } from "src/app/shared/models/order.model";
import { OrderApiService } from "src/app/shared/services/order-api.service";
import { OrderApiActions, OrderPageActions, OrderRouterActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class OrderEffects {
    constructor( 
        private actions$: Actions,
        private orderApiService: OrderApiService,
    ){ 
 
    }

    init$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => [
                OrderRouterActions.LoadOrders(),
            ])
        );
    })

    loadOrders$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderRouterActions.LoadOrders),
            switchMap(() => {
                return this.orderApiService.loadOrders().pipe(
                    map((orders: Order[]) => OrderApiActions.LoadOrdersSuccess({orders})),
                    catchError((err) => of(        OrderApiActions.LoadOrdersError({err})))
                )
            })
        )   
    });

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