import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { WorkflowApiService } from "src/app/shared/services/workflow-api.service";


@Injectable({
    providedIn: 'root'
})
export class WorkflowEffects {
    constructor( 
        private actions$: Actions,
        private WorkflowApiService: WorkflowApiService,
    ){ 
 
    }

    // init$ = createEffect(():any => {
    //     return this.actions$.pipe(
    //         ofType(ROOT_EFFECTS_INIT),
    //         switchMap(() => [
    //             // WorkflowRouterActions.LoadWorkflows(),
    //         ])
    //     );
    // })


    // loadWorkflows$ = createEffect((): any => {
    //     return this.actions$.pipe(
    //         ofType(
    //             WorkflowRouterActions.LoadWorkflows,
    //         ),
    //         switchMap(() => {
    //             return this.WorkflowApiService.loadWorkflows().pipe(
    //                 map((Workflows: Workflow[]) => WorkflowApiActions.LoadWorkflowsSuccess({Workflows})),
    //                 catchError((err) => of(WorkflowApiActions.LoadWorkflowsError({err})))
    //             )
    //         })
    //     )   
    // });



}