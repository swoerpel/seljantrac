import { Injectable } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Order } from "src/app/shared/models/order.model";
import { OrderApiService } from "src/app/shared/services/order-api.service";
import { UserSelectors } from "../user/selectors";
import { OrderApiActions, OrderPageActions, OrderRouterActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class OrderEffects {
    constructor( 
        private actions$: Actions,
        private orderApiService: OrderApiService,
        private router: Router,
        private store: Store,
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
                    catchError((err) => of(OrderApiActions.LoadOrdersError({err})))
                )
            })
        )   
    });

    createOrder$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderPageActions.CreateOrder),
            withLatestFrom(this.store.select(UserSelectors.GetCurrentUserId)),
            switchMap(([action,currentUserId]: [any,string]) => {
                return this.orderApiService.createOrder({
                    ...action.order,
                    creatorId: currentUserId,
                }).pipe(
                    tap((_)=>this.router.navigate(['home'])),
                    switchMap((order: Order) => [
                        OrderApiActions.CreateOrderSuccess({order}),
                        OrderRouterActions.LoadOrders(),
                    ]),
                    catchError((err)=>of(OrderApiActions.CreateOrderError({err})))
                )
            })
        )   
    });


}