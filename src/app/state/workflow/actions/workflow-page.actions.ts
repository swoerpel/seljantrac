import {createAction, props} from '@ngrx/store';

export const LoadSelectedOrder = createAction(
    '[Home Page] Load Selected Order',
    props<{orderId: string;}>()
)

export const AdvanceOrderWorkflowState = createAction(
    '[View Order Page] Advance Order Workflow State',
    props<{orderId: string;}>()
);

export const GetSelectedOrderWorkflow = createAction(
    '[View Order Page] Get Selected Order Workflow',
    // props<{orderId: string;}>()
)


