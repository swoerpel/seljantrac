import { Customer } from "./customer.model";
import { Material } from "./material.model";
import { User } from "./User.model";



export interface Order{
    id: string;
    name: string;
    customerId: string;
    creatorId: string; 
    materialId: string;
    dueDate: Date;
    notes?: string;
    status?: number; // status enum
    fileIds?: string[];
}

export interface ViewOrder {
    id: string;
    name: string;
    materialName: string;
    customerName: string;
    creatorName: string;
    dueDate: Date;
}

export interface CompleteOrder {
    id: string;
    name: string;
    notes: string;
    dueDate: Date;
    customer: Customer;
    material: Material;
    creator: User;
    // workflow: OrderWorkflow; // WORKFLOW ID === ORDER ID
}