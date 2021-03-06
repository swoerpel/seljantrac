import {createAction, props} from '@ngrx/store';
import { FileUpload } from 'src/app/shared/models/order-file.model';
import { Order } from 'src/app/shared/models/order.model';

export const CreateOrder = createAction(
    '[Create Order Page] Create Order',
    props<{order: Order}>()
)

export const SelectOrder = createAction(
    '[Home Page] Select Order',
    props<{orderId: string}>()
)

export const LoadOrderFiles = createAction(
    '[Home Page] Load Order Files',
    props<{orderId: string}>()
)

