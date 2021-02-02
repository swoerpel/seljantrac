import { createFeatureSelector, createSelector } from "@ngrx/store"
import { OrderWorkflow } from "src/app/shared/models/Workflow.model";
import { OrderSelectors } from "../../order/selectors";
import { WorkflowState } from '../workflow.reducer';

const workflowFeatureState = createFeatureSelector<WorkflowState>('workflow');

export const GetSelectedOrderWorkflow = createSelector(
    workflowFeatureState,
    OrderSelectors.GetSelectedOrderId,
    (state: WorkflowState, selectedOrderId: string): OrderWorkflow => 
        state.orderWorkflows?.find(ow=>ow.id === selectedOrderId)
)