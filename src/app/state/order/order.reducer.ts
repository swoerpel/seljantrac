import { createReducer, on } from "@ngrx/store";
import { LoadingState } from "src/app/shared/enums/loading-state.enum";
import { Order } from "src/app/shared/models/order.model";
import { OrderApiActions, OrderPageActions, OrderRouterActions } from "./actions";
import { OrderSelectors } from "./selectors";

export interface OrderState {
    orders: Order[];
    loadingState: LoadingState
    error: any;
}

const initialState: OrderState = {
    orders: [],
    loadingState: LoadingState.Initial,
    error: null,
}

export const orderReducer = createReducer<OrderState>(
    initialState,
    on(OrderRouterActions.LoadOrders, (state, action): OrderState => {
        return {
            ...state,
            error: null
        }
    }),
    on(OrderApiActions.LoadOrdersSuccess, (state, action): OrderState => {
        return {
            ...state,
            orders: action.orders,
            error: null,
        }
    }),
    on(OrderApiActions.LoadOrdersError, (state, action): OrderState => {
        return {
            ...state,
            error: action.err,
        }
    }),

    on(OrderPageActions.CreateOrder, (state, action): OrderState => {
        return {
            ...state,
            loadingState: LoadingState.Pending,
        }
    }),
    on(OrderApiActions.CreateOrderSuccess, (state, action): OrderState => {
        return {
            ...state,
            orders: [...state.orders, action.order],
            error: null,
            loadingState: LoadingState.Stable,
        }
    }),
    on(OrderApiActions.CreateOrderError, (state, action): OrderState => {
        return {
            ...state,
            error: action.err,
            loadingState: LoadingState.Errored,
        }
    }),
);