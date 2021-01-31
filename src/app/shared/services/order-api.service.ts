import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "../models/order.model";
import { head, last} from 'lodash';
import { formatDate } from "@angular/common";
import { DEFAULT_LOCALE, SHORT_DATE_FORMAT } from "../constants/date.constants";

@Injectable({
    providedIn: 'root'
})
export class OrderApiService {
    constructor(
        private store: Store,
        private db: AngularFirestore,
    ){ }

    public loadOrders(): Observable<Order[]>{
        return from(this.db.collection<any>('orders').get()).pipe(
            map((res: any)=>{
                return res.docs.map((d)=>[d.id,d.data()])
            }),
            map((orders: Order[])=>{
                return orders.map((c) => {
                    let id = head(c);
                    let order: any = last(c).order;
                    let dueDate = formatDate(
                        order.dueDate.toDate(),
                        SHORT_DATE_FORMAT,
                        DEFAULT_LOCALE
                    );
                    return {...order,dueDate,id}
                });
            })
        )
    }


    public createOrder(order: Order): Observable<Order>{
        return from(this.db.collection<any>('orders').add({
            order
        })).pipe(
            map((docRef: DocumentReference<any>)=>{
                return {
                    ...order,
                    id: docRef.id,
                }
            })
        )
    }

    public deleteOrder(orderId: string){

    }

}