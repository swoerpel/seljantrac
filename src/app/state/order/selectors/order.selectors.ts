import { createFeatureSelector, createSelector } from "@ngrx/store"
import { OrderState } from '../order.reducer';

const orderFeatureState = createFeatureSelector<OrderState>('order');

export const Default = createSelector(
    orderFeatureState,
    (state: OrderState): any => null
)
