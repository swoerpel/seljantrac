import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Customer } from "src/app/shared/models/customer.model";
import { Order } from "src/app/shared/models/order.model";
import { CustomerApiService } from "src/app/shared/services/customer-api.service";
import { CustomerApiActions, CustomerRouterActions } from "./actions";

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
            ofType(CustomerRouterActions.LoadCustomers),
            switchMap(() => {
                return this.customerApiService.loadCustomers().pipe(
                    map((customers: Customer[]) => CustomerApiActions.LoadCustomersSuccess({customers})),
                    catchError((err) => of(        CustomerApiActions.LoadCustomersError({err})))
                )
            })
        )   
    });

}