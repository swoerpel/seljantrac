import {createAction, props} from '@ngrx/store';
import { Customer } from 'src/app/shared/models/customer.model';
import { OrderWorkflow } from 'src/app/shared/models/Workflow.model';

export const CreateOrderWorkflowSuccess = createAction(
    '[Api] Create Order Workflow Success',
)

export const CreateOrderWorkflowError = createAction(
    '[Api] Create Order Workflow Error',
    props<{err: any}>(),
)

export const LoadOrderWorkflowsSuccess = createAction(
    '[Api] Load Order Workflows Success',
    props<{orderWorkflows: OrderWorkflow[]}>(),
)

export const LoadOrderWorkflowsError = createAction(
    '[Api] Load Order Workflows Error',
    props<{err: any}>(),
)

export const AdvanceOrderWorkflowStateSuccess = createAction(
    '[Api] Advance Order Workflow State Success',
    // props<{orderId: string}>(),
)

export const AdvanceOrderWorkflowStateError = createAction(
    '[Api] Advance Order Workflow State Error',
    props<{err: any}>(),
)

export const RevertOrderWorkflowStateSuccess = createAction(
    '[Api] Revert Order Workflow State Success',
)

export const RevertOrderWorkflowStateError = createAction(
    '[Api] Revert Order Workflow State Error',
    props<{err: any}>(),
)
