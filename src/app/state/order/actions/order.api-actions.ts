import {createAction, props} from '@ngrx/store';
import { FileUpload } from 'src/app/shared/models/order-file.model';
import { Order } from 'src/app/shared/models/order.model';

export const CreateOrderSuccess = createAction(
    '[Order Api] Create Order Success',
    props<{order: Order}>()
)

export const CreateOrderError = createAction(
    '[Order Api] Create Order Error',
    props<{err: any}>()
)

export const LoadOrdersSuccess = createAction(
    '[Order Api] Load Order Success',
    props<{orders: Order[]}>()
)

export const LoadOrdersError = createAction(
    '[Order Api] Load Order Error',
    props<{err: any}>()
)

export const CreateOrderWorkflow = createAction(
    '[Order Api] Create Order Workflow',
    props<{orderId: string}>()
)

export const UpdateOrderFiles = createAction(
    '[Order Api] Update Order Files',
    props<{orderId: string}>()
)

export const UpdateOrderFilesSuccess = createAction(
    '[Order Api] Update Order Files Success',
    // props<{orderId: string; fileUploads: FileUpload[]}>()
)

export const UpdateOrderFilesError = createAction(
    '[Order Api] Update Order Files Error',
    props<{err: any}>()
)

export const LoadOrderFilesSuccess = createAction(
    '[Order Api] Load Order Files Success',
    props<{orderId: string; fileUploads: FileUpload[]}>()
)

export const LoadOrderFilesError = createAction(
    '[Order Api] Load Order Files Error',
    props<{err: any}>()
)