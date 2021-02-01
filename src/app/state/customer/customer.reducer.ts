import { createReducer, on } from "@ngrx/store";
import { Customer } from "src/app/shared/models/customer.model";
import { CustomerApiActions, CustomerRouterActions } from "./actions";

export interface CustomerState {
    customers: Customer[];
    error: any;
}

const initialState: CustomerState = {
    customers: [],
    error: null,
}

export const customerReducer = createReducer<CustomerState>(
    initialState,
    on(CustomerApiActions.LoadCustomersSuccess, (state, action): CustomerState => {
        return {
            ...state,
            customers: action.customers,
            error: null,
        }
    }),
    on(CustomerApiActions.LoadCustomersError, (state, action): CustomerState => {
        return {
            ...state,
            error: action.err,
        }
    }),

    on(CustomerRouterActions.LoadCustomers, (state, action): CustomerState => {
        return {
            ...state,
            error: null
        }
    }),

    on(CustomerApiActions.CreateCustomerSuccess, (state, action): CustomerState => {
        return {
            ...state,
            customers: [...state.customers, action.customer]
        }
    }),
    on(CustomerApiActions.DeleteCustomerSuccess, (state, action): CustomerState => {
        return {
            ...state,
            customers: state.customers.filter(c=>c.id !== action.customerId)
        }
    }),
    on(CustomerApiActions.DeleteCustomerError, (state, action): CustomerState => {
        return {
            ...state,
            error: action.err,
        }
    }),
);