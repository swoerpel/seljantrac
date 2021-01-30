import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CustomerState } from '../customer.reducer';

const customerFeatureState = createFeatureSelector<CustomerState>('customer');

export const GetCustomers = createSelector(
    customerFeatureState,
    (state: CustomerState): any => state.customers
)