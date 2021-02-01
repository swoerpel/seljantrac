import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { first } from 'rxjs/operators';
import { Order, ViewOrder } from 'src/app/shared/models/order.model';
import { OrderPageActions } from 'src/app/state/order/actions';
import { OrderSelectors } from 'src/app/state/order/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public viewOrders$: Observable<ViewOrder[]>;

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.viewOrders$ = this.store.select(OrderSelectors.GetViewOrders).pipe(
      filter(orders=>orders.length > 0),
    )
  }

  public createItem(){
    this.router.navigate(['/create']);

  }

  public orderSelected(selectedOrder: Order){
    this.store.dispatch(OrderPageActions.SelectOrder({orderId: selectedOrder.id}))
    this.router.navigate([`home/${selectedOrder.id}/`])
  }

}
