import {createAction, props} from '@ngrx/store';
import { Order } from 'src/app/shared/models/order.model';

export const LoadOrders = createAction(
    '[Router] Load Orders',
)

export const ResetSelectedOrder = createAction(
    '[Router to Home] Reset Selected Order',
)
