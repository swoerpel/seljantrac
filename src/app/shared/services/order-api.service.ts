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
            map((res: any)=>{
                return res.docs.map((d)=>({...d.data(),id:d.id}))
            }),
            map((orders: Order[])=>{
                return orders.map((order: any) => {
                    let dueDate: string = formatDate(
                        order?.dueDate.toDate(),
                        SHORT_DATE_FORMAT,
                        DEFAULT_LOCALE
                    );
                    let createdOn: string = formatDate(
                        order.createdOn.toDate(),
                        SHORT_DATE_FORMAT,
                        DEFAULT_LOCALE
                    );
                    return {...order,dueDate,createdOn} as Order
                });
            })
        )
    }

    public createOrder(order: Order): Observable<Order>{
        order = {...order, createdOn: firebase.default.firestore.FieldValue.serverTimestamp()};
        return from(this.db.collection<any>('orders').add(order)).pipe(
            map((docRef: DocumentReference<any>)=>{
                return {...order,id: docRef.id}
            })
        )
    }

    public deleteOrder(orderId: string){

    }

}