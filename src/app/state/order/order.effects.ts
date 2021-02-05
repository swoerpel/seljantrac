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
import { FileActions } from "../file/actions";
import { FileSelectors } from "../file/selectors";
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

    resetSelectedOrder$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            tap(console.log),
            filter(({payload:{event:{url}}})=> url === '/home'),
            switchMap(() => [
                OrderRouterActions.ResetSelectedOrder(),
            ])
        );
    })

    loadSelectedOrderWorkflow$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(OrderPageActions.SelectOrder),
            map(p=>p.orderId),
            switchMap((orderId: string) => [
                WorkflowPageActions.LoadSelectedOrder({orderId}),
                OrderPageActions.LoadOrderFiles({orderId}),
            ])
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
                        // OrderRouterActions.LoadOrders(),
                        OrderApiActions.CreateOrderWorkflow({orderId:order.id}),
                        OrderApiActions.UpdateOrderFiles({orderId:order.id})
                    ]),
                    catchError((err)=>of(OrderApiActions.CreateOrderError({err})))
                )
            })
        )   
    });

    loadOrderFiles$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderPageActions.LoadOrderFiles),
            switchMap(({orderId}) => {
                return this.orderApiService.loadOrderFiles(orderId).pipe(
                    switchMap((fileUploads: FileUpload[])=>[
                        OrderApiActions.LoadOrderFilesSuccess({orderId,fileUploads}),
                    ]),
                    catchError((err)=>of(OrderApiActions.LoadOrderFilesError({err})))
                )
            })
        )   
    });

    updateOrderFiles$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderApiActions.UpdateOrderFiles),
            map(p=>p.orderId),
            withLatestFrom(this.store.select(FileSelectors.GetFileUploads)),
            switchMap(([orderId,fileUploads]:[string,FileUpload[]]) => {
                return this.orderApiService.updateOrderFiles(orderId,fileUploads).pipe(
                    switchMap(()=>[
                        OrderApiActions.UpdateOrderFilesSuccess(),
                        OrderRouterActions.LoadOrders()
                    ]),
                    catchError((err)=>of(OrderApiActions.UpdateOrderFilesError({err})))
                )
            })
        )   
    });


}