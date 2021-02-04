import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap, map, catchError, withLatestFrom, tap } from "rxjs/operators";
import { DEFAULT_WORKFLOW_STEP_STRINGS } from "src/app/shared/constants/workflow.constants";
import { OrderWorkflow } from "src/app/shared/models/Workflow.model";
import { WorkflowApiService } from "src/app/shared/services/workflow-api.service";
import { OrderApiActions, OrderRouterActions } from "../order/actions";
import { WorkflowApiActions, WorkflowPageActions, WorkflowRouterActions } from "./actions";
import { WorkflowSelectors } from "./selectors";
import { head, last } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class WorkflowEffects {
    constructor( 
        private actions$: Actions,
        private store: Store,
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
                    map((orderWorkflow: OrderWorkflow) => WorkflowApiActions.CreateOrderWorkflowSuccess()),
                    catchError((err) => of(WorkflowApiActions.CreateOrderWorkflowError({err})))
                )
            })
        )   
    });


    loadOrderWorkflows$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(
                WorkflowRouterActions.LoadOrderWorkflows,
                WorkflowApiActions.CreateOrderWorkflowSuccess,
                WorkflowApiActions.AdvanceOrderWorkflowStateSuccess,
                WorkflowApiActions.RevertOrderWorkflowStateSuccess,
            ),
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


    advanceWorkflowState$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(WorkflowPageActions.AdvanceOrderWorkflowState),
            map(p=>p.orderId),
            withLatestFrom(this.store.select(WorkflowSelectors.GetSelectedOrderWorkflow)),
            switchMap(([orderId,selectedOrderWorkflow]: [string,OrderWorkflow]) => {
                // this 100% needs to be composed into a general function
                // thermometer.component.ts implements a version of this
                const stepToAdvance = head(
                    Object.entries(selectedOrderWorkflow).sort(([k1,_],[k2,__]) => 
                        DEFAULT_WORKFLOW_STEP_STRINGS.indexOf(k1) - 
                        DEFAULT_WORKFLOW_STEP_STRINGS.indexOf(k2)
                    ).find(([_,value])=>!value)
                );

                return this.workflowApiService.advanceWorkflow(orderId,stepToAdvance).pipe(
                    map((_) => WorkflowApiActions.AdvanceOrderWorkflowStateSuccess()),
                    catchError((err) => {
                        return of(WorkflowApiActions.AdvanceOrderWorkflowStateError({err}))
                    })
                )
            })
        )   
    });

    revertWorkflowState$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(WorkflowPageActions.RevertOrderWorkflowState),
            map(p=>p.orderId),
            withLatestFrom(this.store.select(WorkflowSelectors.GetSelectedOrderWorkflow)),
            switchMap(([orderId,selectedOrderWorkflow]: [string,OrderWorkflow]) => {
                let stepToRevert = last(DEFAULT_WORKFLOW_STEP_STRINGS);
                DEFAULT_WORKFLOW_STEP_STRINGS.forEach((step: string,i: number)=>{
                    if(selectedOrderWorkflow[step] === null && i !== 0){
                        stepToRevert = DEFAULT_WORKFLOW_STEP_STRINGS[i - 1];
                    }
                })
                return this.workflowApiService.revertWorkflow(orderId, stepToRevert).pipe(
                    map((_) => WorkflowApiActions.RevertOrderWorkflowStateSuccess()),
                    catchError((err) => {
                        return of(WorkflowApiActions.RevertOrderWorkflowStateError({err}))
                    })
                )
            })
        )   
    });

}