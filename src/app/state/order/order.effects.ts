import { Injectable } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FileUpload } from "src/app/shared/models/order-file.model";
import { Order } from "src/app/shared/models/order.model";
import { OrderWorkflow } from "src/app/shared/models/Workflow.model";
import { OrderApiService } from "src/app/shared/services/order-api.service";
import { WorkflowApiService } from "src/app/shared/services/workflow-api.service";
import { UserSelectors } from "../user/selectors";
import { WorkflowApiActions, WorkflowPageActions } from "../workflow/actions";
import { OrderApiActions, OrderPageActions, OrderRouterActions } from "./actions";
import { OrderSelectors } from "./selectors";

@Injectable({
    providedIn: 'root'
})
export class OrderEffects {
    constructor( 
        private actions$: Actions,
        private orderApiService: OrderApiService,
        private workflowApiService: WorkflowApiService,
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

    loadSelectedOrderWorkflow$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(OrderPageActions.SelectOrder),
            map(p=>p.orderId),
            switchMap((orderId: string) => of(WorkflowPageActions.LoadSelectedOrder({orderId})))
        );
    })

    loadOrders$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderRouterActions.LoadOrders),
            switchMap(() => {
                return this.orderApiService.loadOrders().pipe(
                    map((orders: Order[]) => OrderApiActions.LoadOrdersSuccess({orders})),
                    catchError((err) => {
                        return of(OrderApiActions.LoadOrdersError({err}))
                    })
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
                        OrderApiActions.CreateOrderWorkflow({orderId:order.id}),
                    ]),
                    catchError((err)=>of(OrderApiActions.CreateOrderError({err})))
                )
            })
        )   
    });

    addOrderFile$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderPageActions.AddOrderFile),
            map(p=>p.fileUpload),
            withLatestFrom(this.store.select(OrderSelectors.GetSelectedOrderId)),
            switchMap(([fileUpload, orderId]: [FileUpload,string]) => {
                return this.orderApiService.addFileToOrder(fileUpload,orderId).pipe(
                    map((res)=>{
                        console.log('res',res)
                        return OrderApiActions.AddOrderFileSuccess();
                    }),
                    catchError((err)=>of(OrderApiActions.AddOrderFileError({err})))
                )
            })
        )   
    });


}