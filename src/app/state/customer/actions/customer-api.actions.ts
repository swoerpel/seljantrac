import {createAction, props} from '@ngrx/store';
import { Customer } from 'src/app/shared/models/customer.model';

export const LoadCustomersSuccess = createAction(
    '[Router] Load Customers Success',
    props<{customers: Customer[]}>()
)

export const LoadCustomersError = createAction(
    '[Router] Load Customers Error',
    props<{err: any}>()
)