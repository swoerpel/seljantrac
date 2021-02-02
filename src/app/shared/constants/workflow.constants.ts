import { WorkflowStepType } from "../enums/workflow.enum";

export const DEFAULT_WORKFLOW_STEPS = [
    WorkflowStepType.Created,
    WorkflowStepType.Started,
    WorkflowStepType.Completed,
]

export const DEFAULT_WORKFLOW_STEP_STRINGS = [
    'created',
    'started',
    'completed',
]