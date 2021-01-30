import {createAction, props} from '@ngrx/store';
import { Order } from 'src/app/shared/models/order.model';

export const CreateOrderSuccess = createAction(
    '[Order Api] Create Order Success',
    props<{order: Order}>()
)

export const CreateOrderError = createAction(
    '[Order Api] Create Order Error',
    props<{err: any}>()
)