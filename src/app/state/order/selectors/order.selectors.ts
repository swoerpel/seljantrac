import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Customer } from "src/app/shared/models/customer.model";
import { Material } from "src/app/shared/models/material.model";
import { Order, OrderView } from "src/app/shared/models/order.model";
import { User } from "src/app/shared/models/User.model";
import { CustomerSelectors } from "../../customer/selectors";
import { MaterialSelectors } from "../../material/selectors";
import { UserSelectors } from "../../user/selectors";
import { OrderState } from '../order.reducer';

const orderFeatureState = createFeatureSelector<OrderState>('order');

export const GetOrders = createSelector(
    orderFeatureState,
    CustomerSelectors.GetCustomers,
    MaterialSelectors.GetMaterials,
    UserSelectors.GetUsers,
    (
        state: OrderState, 
        customers: Customer[], 
        materials: Material[],
        users: User[],
    ): OrderView[] => {
        let orders = state.orders.map((order)=>{
            let materialType = materials.find(m=>m.id === order.materialId)?.type;
            let customerName = customers.find(c=>c.id === order.customerId)?.name;
            let user: User = users.find(u=>u.id === order.creatorId);
            return {
                id: order.id,
                name: order.name,
                materialType,
                customerName,
                creatorName: `${user.firstName} ${user.lastName}`,
                dueDate: order.dueDate,
            }
        })
        let invalid = orders.some((order)=>Object.values(order).includes(undefined))
        return invalid ? [] : orders;
    }
)