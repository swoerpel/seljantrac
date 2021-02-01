export interface Workflow {
    id: string;
    name: string;
    stepIds: string[];
}

export interface WorkflowStep {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
}