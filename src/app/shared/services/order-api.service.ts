import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Order } from "../models/order.model";
import { head, last, omit} from 'lodash';
import { formatDate } from "@angular/common";
import { DEFAULT_LOCALE, SHORT_DATE_FORMAT } from "../constants/date.constants";
import { uid } from 'uid';
import * as firebase from 'firebase/app';
import { WorkflowStepType } from "../enums/workflow.enum";
import { FileUpload } from "../models/order-file.model";

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
            map((res: any) => res.docs.map((d)=>{
                // d.ref.collection('files').get().docs.forEach((e)=>console.log("e.data",e.data()))
                return {...d.data(),id:d.id}
            })),
            map((orders: Order[])=>{
                return orders.map((order: any) => {
                    let dueDate: string = formatDate(
                        order?.dueDate.toDate(),
                        SHORT_DATE_FORMAT,
                        DEFAULT_LOCALE
                    );
                    return {...order,dueDate} as Order
                });
            }),
            tap(console.log),
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

    public updateOrderFiles(orderId: string, fileUploads: FileUpload[]): Observable<any>{
        const batch = this.db.firestore.batch();
        const fileCollectionRef = this.db.collection<any>('orders').doc(orderId).collection('files')
        fileUploads.forEach((fileUpload: FileUpload) => {
            const fileDocRef = fileCollectionRef.doc(fileUpload.id).ref;
            batch.set(fileDocRef,{
                name: fileUpload.name
            })
        })
        return from(batch.commit())
    }

    public loadOrderFiles(orderId: string): Observable<any>{
        const files = this.db.collection<any>('orders').doc(orderId).collection('files').get()
        return files.pipe(
            map((res)=>{
                return res.docs.map((d)=>({id:d.id,...d.data()}))
            })
        )
    }

}