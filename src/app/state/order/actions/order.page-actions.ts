import {createAction, props} from '@ngrx/store';
import { Order } from 'src/app/shared/models/order.model';

export const CreateOrder = createAction(
    '[Create Order Page] Create Order',
    props<{order: Order}>()
)

export const SelectOrder = createAction(
    '[Home Page] Select Order',
    props<{orderId: string}>()
)