import { createReducer, on } from "@ngrx/store";
import { Order } from "src/app/shared/models/order.model";
import { OrderApiActions, OrderPageActions } from "./actions";
import { OrderSelectors } from "./selectors";

export interface OrderState {
    orders: Order[];
    error: any;
}

const initialState: OrderState = {
    orders: [],
    error: null,
}

export const orderReducer = createReducer<OrderState>(
    initialState,
    on(OrderPageActions.CreateOrder, (state, action): OrderState => {
        return {
            ...state,
        }
    }),
    on(OrderApiActions.CreateOrderSuccess, (state, action): OrderState => {
        return {
            ...state,
            orders: [...state.orders, action.order],
            error: null,
        }
    }),
    on(OrderApiActions.CreateOrderError, (state, action): OrderState => {
        return {
            ...state,
            error: action.err,
        }
    }),
);