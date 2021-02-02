import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CompleteOrder, Order } from 'src/app/shared/models/order.model';
import { OrderWorkflow } from 'src/app/shared/models/Workflow.model';
import { OrderSelectors } from 'src/app/state/order/selectors';
import { WorkflowPageActions } from 'src/app/state/workflow/actions';
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
      filter(ow=>!!ow),
      tap(console.log)
    );
    
    
  }

  public revertWorkflowState(orderId: string){
    console.log("orderWorkflowId",orderId)
  }

  public advanceWorkflowState(orderId: string){
    this.store.dispatch(WorkflowPageActions.AdvanceOrderWorkflowState({orderId}))
  }
}
