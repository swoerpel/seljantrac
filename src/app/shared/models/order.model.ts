import { Customer } from "./customer.model";
import { Material } from "./material.model";
import { User } from "./User.model";





export interface Order{
    id: string;
    name: string;
    customerId: string; // customer type
    creatorId: string; // user id of creator
    materialId: string; // will be material type
    dueDate: Date;
    createdOn: any;
    notes?: string;
    status?: number; // status enum
    fileIds?: string[];
}

export interface ViewOrder {
    id: string;
    name: string;
    materialType: string;
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
}