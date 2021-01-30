import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "../models/order.model";


@Injectable({
    providedIn: 'root'
})
export class OrderApiService {
    constructor(
        private store: Store,
        private db: AngularFirestore,
    ){ }

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