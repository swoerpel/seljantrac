import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "../models/order.model";
import { head, last} from 'lodash';
import { formatDate } from "@angular/common";
import { DEFAULT_LOCALE, SHORT_DATE_FORMAT } from "../constants/date.constants";
import { uid } from 'uid';
import * as firebase from 'firebase/app';
import { WorkflowStepType } from "../enums/workflow.enum";

@Injectable({
    providedIn: 'root'
})
export class OrderApiService {
    constructor(
        private store: Store,
        private db: AngularFirestore,
    ){
    }

    public loadOrders(): Observable<Order[]>{
        return from(this.db.collection<any>('orders').get()).pipe(
            map((res: any) => res.docs.map((d)=>({...d.data(),id:d.id}))),
            map((orders: Order[])=>{
                return orders.map((order: any) => {
                    let dueDate: string = formatDate(
                        order?.dueDate.toDate(),
                        SHORT_DATE_FORMAT,
                        DEFAULT_LOCALE
                    );
                    return {...order,dueDate} as Order
                });
            })
        )
    }

    public createOrder(order: Order): Observable<Order>{
        const id = uid(6);
        return from(this.db.collection<any>('orders').doc(id).set(order)).pipe(
            map((_)=>({...order,id}))
        )
    }

    public deleteOrder(orderId: string){

    }

}