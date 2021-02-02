import { createFeatureSelector, createSelector } from "@ngrx/store"
import { WorkflowState } from '../workflow.reducer';

const workflowFeatureState = createFeatureSelector<WorkflowState>('workflow');

export const GetSelectedOrderWorkflow = createSelector(
    workflowFeatureState,
    (state: WorkflowState): any => state.selectedWorkflow
)