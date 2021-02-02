import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { from, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { OrderWorkflow } from "../models/Workflow.model";

@Injectable({
    providedIn: 'root'
})
export class WorkflowApiService {
    constructor(
        private db: AngularFirestore,
    ){
    }

    public createOrderWorkflow(orderId: string): Observable<OrderWorkflow>{
        let workflow: Omit<OrderWorkflow, 'id'> = {
            created: firebase.default.firestore.FieldValue.serverTimestamp(),
            started: null,
            completed: null,
        }
        return from(this.db.collection<any>('workflows').doc(orderId).set(workflow)).pipe(
            map((_)=>({...workflow,id:orderId}))
        )
    }

    public loadOrderWorkflows(): Observable<any>{
        return from(this.db.collection<any>('workflows').get()).pipe(
            map((workflowDB)=> workflowDB.docs.map((workflow) => {
                return {
                    ...workflow.data(),
                    id: workflow.id
                }
            }))
        );
    }

    public advanceWorkflow(orderId: string,nextStep: string): Observable<any>{
        console.log('orderId',orderId)
        // console.log("nextStep",nextStep)
        return from(this.db.collection<any>('workflows').doc(orderId).update({
            [nextStep]:firebase.default.firestore.FieldValue.serverTimestamp()
        })).pipe(
            map((_)=>{
                console.log('update workflow success')
            })
        );
    }

    public getOrderWorkflow(orderId: string): Observable<any>{
        console.log('orderId',orderId)
        return from(this.db.collection<any>('workflows').doc(orderId).get()).pipe(
            tap((res)=>{
                console.log("res",res)
            })
        );
    }


}