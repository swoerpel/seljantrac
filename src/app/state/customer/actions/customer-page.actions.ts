import {createAction, props} from '@ngrx/store';

export const CreateCustomer = createAction(
    '[Settings Page] Create Customer',
    props<{name: string}>(),
)

export const DeleteCustomer = createAction(
    '[Settings Page] Delete Customer',
    props<{customerId: string;}>(),
)