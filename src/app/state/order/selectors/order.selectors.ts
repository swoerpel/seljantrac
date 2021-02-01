import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Customer } from "src/app/shared/models/customer.model";
import { Material } from "src/app/shared/models/material.model";
import { Order, CompleteOrder, ViewOrder } from "src/app/shared/models/order.model";
import { User } from "src/app/shared/models/User.model";
import { CustomerSelectors } from "../../customer/selectors";
import { MaterialSelectors } from "../../material/selectors";
import { UserSelectors } from "../../user/selectors";
import { OrderState } from '../order.reducer';

const orderFeatureState = createFeatureSelector<OrderState>('order');

export const GetCompleteOrders = createSelector(
    orderFeatureState,
    CustomerSelectors.GetCustomers,
    MaterialSelectors.GetMaterials,
    UserSelectors.GetUsers,
    (
        state: OrderState, 
        customers: Customer[], 
        materials: Material[],
        users: User[],
    ): CompleteOrder[] => {
        return state.orders.map((order)=>{
            let material: Material = materials.find(m=>m.id === order.materialId);
            let customer: Customer = customers.find(c=>c.id === order.customerId);
            let creator: User = users.find(u=>u.id === order.creatorId);
            return {
                id: order.id,
                name: order.name,
                dueDate: order.dueDate,
                notes: order.notes,
                material,
                customer,
                creator,
            }
        })
    }
)

export const GetSelectedOrder = createSelector(
    orderFeatureState,
    (state: OrderState): Order => state.orders
        .find((order: Order) => order.id === state.selectedOrderId)
)

export const GetViewOrders = createSelector(
    GetCompleteOrders,
    (completeOrders: CompleteOrder[]): ViewOrder[] => {
        let orders: ViewOrder[] = completeOrders.map((order)=>{
            return {
                id: order.id,
                name: order.name,
                materialType: order.material?.type,
                customerName: order.customer?.name,
                creatorName: `${order.creator?.firstName} ${order.creator?.lastName}`,
                dueDate: order.dueDate,
            }
        })
        // let invalid = orders.some((order)=>Object.values(order).includes(undefined))
        return orders;
    }
 
)

export const GetSelectedCompleteOrder = createSelector(
    orderFeatureState,
    GetCompleteOrders,
    (state: OrderState, completeOrders: CompleteOrder[]): CompleteOrder => {
        return completeOrders.find((co: CompleteOrder) => co.id === state.selectedOrderId)
    }
 
)
