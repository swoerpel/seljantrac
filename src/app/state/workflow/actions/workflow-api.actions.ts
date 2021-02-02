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
    props<{orderWorkflow: OrderWorkflow}>(),
)

export const AdvanceOrderWorkflowStateError = createAction(
    '[Api] Advance Order Workflow State Error',
    props<{err: any}>(),
)

export const GetSelectedOrderWorkflowSuccess = createAction(
    '[Api] Get Selected Order Workflow Success',
    props<{orderWorkflow: OrderWorkflow}>(),
)

export const GetSelectedOrderWorkflowError = createAction(
    '[Api] Get Selected Order Workflow Error',
    props<{err: any}>(),
)
