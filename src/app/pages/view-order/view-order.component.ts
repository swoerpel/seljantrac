import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CompleteOrder, Order } from 'src/app/shared/models/order.model';
import { OrderWorkflow } from 'src/app/shared/models/Workflow.model';
import { OrderSelectors } from 'src/app/state/order/selectors';
import { WorkflowSelectors } from 'src/app/state/workflow/selectors';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  public completeOrder$: Observable<CompleteOrder>;
  public orderWorkflow$: Observable<OrderWorkflow>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.completeOrder$ = this.store.select(OrderSelectors.GetSelectedCompleteOrder);
    this.orderWorkflow$ = this.store.select(WorkflowSelectors.GetSelectedOrderWorkflow).pipe(
      filter(ow=>!!ow)
    );
    
    this.orderWorkflow$.subscribe(console.log)

  }

}
