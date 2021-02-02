import { createReducer, on } from "@ngrx/store";
import { OrderWorkflow } from "src/app/shared/models/Workflow.model";
import { WorkflowApiActions, WorkflowPageActions } from "./actions";

export interface WorkflowState {
    orderWorkflows: OrderWorkflow[];
    selectedOrderWorkflow: OrderWorkflow;
    error: any;
}

const initialState: WorkflowState = {
    orderWorkflows: null,
    selectedOrderWorkflow: null,
    error: null,
}

export const workflowReducer = createReducer<WorkflowState>(
    initialState,
    on(WorkflowApiActions.CreateOrderWorkflowSuccess, (state, action): WorkflowState => {
        return {
            ...state,
        }
    }),
    on(WorkflowApiActions.CreateOrderWorkflowError, (state, action): WorkflowState => {
        return {
            ...state,
        }
    }),
    on(WorkflowApiActions.LoadOrderWorkflowsSuccess, (state, action): WorkflowState => {
        return {
            ...state,
            orderWorkflows: action.orderWorkflows,
            error: null
        }
    }),
    on(WorkflowApiActions.LoadOrderWorkflowsError, (state, action): WorkflowState => {
        return {
            ...state,
            error: action.err
        }
    }),
    on(WorkflowPageActions.LoadSelectedOrder, (state, action): WorkflowState => {
        return {
            ...state,
            // ORDER ID IS CORRECT, ORDER AND WORKFLOW ARE BUILT IN PARRALLEL AND SHARE IDS
            selectedOrderWorkflow: state.orderWorkflows.find(ow => ow.id === action.orderId)
        }
    }),
    on(WorkflowApiActions.GetSelectedOrderWorkflowSuccess, (state, action): WorkflowState => {
        console.log('action.orderWorkflow',action.orderWorkflow)
        return {
            ...state,
            selectedOrderWorkflow: action.orderWorkflow
            // ORDER ID IS CORRECT, ORDER AND WORKFLOW ARE BUILT IN PARRALLEL AND SHARE IDS
            // selectedWorkflow: state.orderWorkflows.find(ow => ow.id === action.orderId)
        }
    }),
);


