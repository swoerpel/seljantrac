import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Customer } from "src/app/shared/models/customer.model";
import { Material } from "src/app/shared/models/material.model";
import { Order, OrderView } from "src/app/shared/models/order.model";
import { CustomerSelectors } from "../../customer/selectors";
import { MaterialSelectors } from "../../material/selectors";
import { OrderState } from '../order.reducer';

const orderFeatureState = createFeatureSelector<OrderState>('order');


export const GetLoadingState = createSelector(
    orderFeatureState,
    (state: OrderState) => state.loadingState
)

export const GetOrders = createSelector(
    orderFeatureState,
    CustomerSelectors.GetCustomers,
    MaterialSelectors.GetMaterials,
    (
        state: OrderState, 
        customers: Customer[], 
        materials: Material[]
    ): OrderView[] => {
        console.log('materials',materials)
        return state.orders.map((order: Order) => {
            console.log('order',order)
            return {
                id: order.id,
                name: order.name,
                materialType: materials.find(m=>m.id === order.materialId)?.type,
                customerName: customers.find(c=>c.id === order.customerId)?.name,
                creatorName: order.creatorId,
            }
        })
    }
)