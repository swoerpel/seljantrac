import {createAction, props} from '@ngrx/store';

export const LoadSelectedOrder = createAction(
    '[Home Page] Load Selected Order',
    props<{orderId: string;}>()
)
