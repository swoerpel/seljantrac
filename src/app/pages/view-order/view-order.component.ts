import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompleteOrder, Order } from 'src/app/shared/models/order.model';
import { OrderSelectors } from 'src/app/state/order/selectors';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  public completeOrder$: Observable<CompleteOrder>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.completeOrder$ = this.store.select(OrderSelectors.GetSelectedCompleteOrder);
  }

}
