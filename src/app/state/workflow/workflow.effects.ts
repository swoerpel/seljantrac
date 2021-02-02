import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { OrderWorkflow } from "src/app/shared/models/Workflow.model";
import { WorkflowApiService } from "src/app/shared/services/workflow-api.service";
import { OrderApiActions, OrderRouterActions } from "../order/actions";
import { WorkflowApiActions, WorkflowRouterActions } from "./actions";


@Injectable({
    providedIn: 'root'
})
export class WorkflowEffects {
    constructor( 
        private actions$: Actions,
        private workflowApiService: WorkflowApiService,
    ){ 
 
    }

    init$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => [
                WorkflowRouterActions.LoadOrderWorkflows(),
            ])
        );
    })


    createOrderWorkflow$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(OrderApiActions.CreateOrderWorkflow),
            map(p => p.orderId),
            switchMap((orderId: string) => {
                return this.workflowApiService.createOrderWorkflow(orderId).pipe(
                    map((orderWorkflow: OrderWorkflow) => WorkflowApiActions.CreateOrderWorkflowSuccess({orderWorkflow})),
                    catchError((err) => of(WorkflowApiActions.CreateOrderWorkflowError({err})))
                )
            })
        )   
    });


    loadOrders$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(WorkflowRouterActions.LoadOrderWorkflows),
            switchMap(() => {
                return this.workflowApiService.loadOrderWorkflows().pipe(
                    map((orderWorkflows: OrderWorkflow[]) => WorkflowApiActions.LoadOrderWorkflowsSuccess({orderWorkflows})),
                    catchError((err) => {
                        return of(WorkflowApiActions.LoadOrderWorkflowsError({err}))
                    })
                )
            })
        )   
    });

}