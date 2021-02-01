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

export const CreateCustomerSuccess = createAction(
    '[Router] Create Customer Success',
    props<{customer: Customer}>()
)

export const CreateCustomerError = createAction(
    '[Router] Create Customer Error',
    props<{err: any}>()
)

export const DeleteCustomerSuccess = createAction(
    '[Router] Delete Customer Success',
    props<{customerId: string}>()
)

export const DeleteCustomerError = createAction(
    '[Router] Delete Customer Error',
    props<{err: any}>()
)