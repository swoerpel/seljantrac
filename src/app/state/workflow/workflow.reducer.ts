import { createReducer, on } from "@ngrx/store";
import { Workflow } from "src/app/shared/models/Workflow.model";
import { WorkflowApiActions, WorkflowRouterActions } from "./actions";

export interface WorkflowState {
}

const initialState: WorkflowState = {
}

export const workflowReducer = createReducer<WorkflowState>(
    initialState,
    on(WorkflowApiActions.Default, (state, action): WorkflowState => {
        return {
            ...state,
        }
    }),
);