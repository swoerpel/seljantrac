import { createReducer, on } from "@ngrx/store";
import { Order } from "src/app/shared/models/order.model";
import { OrderWorkflow } from "src/app/shared/models/Workflow.model";
import { OrderApiActions, OrderPageActions, OrderRouterActions } from "./actions";

export interface OrderState {
    orders: Order[];
    selectedOrderId: string;
    selectedOrderWorkflow: OrderWorkflow;
    error: any;
}

const initialState: OrderState = {
    orders: [],
    selectedOrderId: null,
    selectedOrderWorkflow: null,
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
    on(OrderPageActions.SelectOrder, (state, action): OrderState => {
        return {
            ...state,
            selectedOrderId: action.orderId,
        }
    }),
);