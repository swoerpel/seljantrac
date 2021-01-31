import {createAction, props} from '@ngrx/store';
import { Customer } from 'src/app/shared/models/customer.model';
import { Order } from 'src/app/shared/models/order.model';

export const LoadMaterials = createAction(
    '[Router] Load Materials',
)
