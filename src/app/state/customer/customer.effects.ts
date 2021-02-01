import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Customer } from "src/app/shared/models/customer.model";
import { Order } from "src/app/shared/models/order.model";
import { CustomerApiService } from "src/app/shared/services/customer-api.service";
import { CustomerApiActions, CustomerPageActions, CustomerRouterActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class CustomerEffects {
    constructor( 
        private actions$: Actions,
        private customerApiService: CustomerApiService,
    ){ 
 
    }

    init$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => [
                CustomerRouterActions.LoadCustomers(),
            ])
        );
    })


    loadCustomers$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(
                CustomerRouterActions.LoadCustomers,
                CustomerApiActions.CreateCustomerSuccess,
                CustomerApiActions.DeleteCustomerSuccess,
            ),
            switchMap(() => {
                return this.customerApiService.loadCustomers().pipe(
                    map((customers: Customer[]) => CustomerApiActions.LoadCustomersSuccess({customers})),
                    catchError((err) => of(CustomerApiActions.LoadCustomersError({err})))
                )
            })
        )   
    });


    createCustomer$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(CustomerPageActions.CreateCustomer),
            switchMap((action) => {
                return this.customerApiService.createCustomer(action.name).pipe(
                    map((customer: Customer) => CustomerApiActions.CreateCustomerSuccess({customer})),
                    catchError((err) => of(CustomerApiActions.CreateCustomerError({err})))
                )
            })
        )   
    });

    deleteCustomer$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(CustomerPageActions.DeleteCustomer),
            switchMap((action) => {
                return this.customerApiService.deleteCustomer(action.customerId).pipe(
                    map(() => CustomerApiActions.DeleteCustomerSuccess({customerId: action.customerId})),
                    catchError((err) => of(CustomerApiActions.DeleteCustomerError({err})))
                )
            })
        )   
    });

}