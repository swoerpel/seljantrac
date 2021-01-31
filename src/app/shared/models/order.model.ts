import { Material } from "./material.model";

export interface Order{
    id: string;
    name: string;
    customerId: string; // customer type
    creatorId: string; // user id of creator
    materialId: string; // will be material type
    dueDate: Date;
    notes?: string;
    status?: number; // status enum
    fileIds?: string[];
}


export interface OrderView {
    id: string;
    name: string;
    materialType: string;
    customerName: string;
    creatorName: string;
}