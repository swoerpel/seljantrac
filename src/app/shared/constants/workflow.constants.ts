import { WorkflowStepType } from "../enums/workflow.enum";

export const DEFAULT_WORKFLOW_STEPS = [
    WorkflowStepType.Created,
    WorkflowStepType.Started,
    WorkflowStepType.Completed,
]