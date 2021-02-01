import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { head, last } from 'lodash';
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { uid } from "uid";
import { Customer } from "../models/customer.model";


@Injectable({
    providedIn: 'root'
})
export class CustomerApiService {
    constructor(
        private store: Store,
        private db: AngularFirestore,
    ){ }

    public loadCustomers(): Observable<Customer[]>{
        return from(this.db.collection<any>('customers').get()).pipe(
            map((res: any)=>{
                return res.docs.map((d)=>[d.id,d.data()])
            }),
            map((customers: Customer[])=>{
                return customers.map((c)=>{
                    return {
                        ...last(c),
                        id: head(c),
                    }
                });
            })
        )
    }

    public createCustomer(name: string): Observable<Customer>{
        let id = uid(6);
        return from(
            this.db.collection<any>('customers')
                .doc(id)
                .set({name})
            ).pipe(map(_=>({id,name})))
    }

    public deleteCustomer(customerId: string): Observable<void>{
        return from(this.db.collection<any>('customers').doc(customerId).delete())
    }

}