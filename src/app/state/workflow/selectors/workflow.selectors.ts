import { createFeatureSelector, createSelector } from "@ngrx/store"
import { WorkflowState } from '../workflow.reducer';

const workflowFeatureState = createFeatureSelector<WorkflowState>('workflow');

export const Default = createSelector(
    workflowFeatureState,
    (state: WorkflowState): any => null//state.Workflows
)