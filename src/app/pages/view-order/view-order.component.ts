import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { CompleteOrder, Order } from 'src/app/shared/models/order.model';
import { OrderWorkflow } from 'src/app/shared/models/Workflow.model';
import { OrderSelectors } from 'src/app/state/order/selectors';
import { WorkflowPageActions } from 'src/app/state/workflow/actions';
import { WorkflowSelectors } from 'src/app/state/workflow/selectors';
import { last } from 'lodash';
import { OrderPageActions, OrderRouterActions } from 'src/app/state/order/actions';

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
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.store.select(OrderSelectors.GetSelectedOrderId).pipe(
      filter((orderId)=>{
        return orderId === null
      }),
      first(),
      tap(()=>{
        let orderId = last(this.router.url.split('/'));
        this.store.dispatch(OrderPageActions.SelectOrder({orderId}))
      })
    ).subscribe();


    this.completeOrder$ = this.store.select(OrderSelectors.GetSelectedCompleteOrder).pipe(
    );
    this.orderWorkflow$ = this.store.select(WorkflowSelectors.GetSelectedOrderWorkflow).pipe(
      filter(ow=>!!ow),
    );
  }

  public revertWorkflowState(orderId: string){
  }

  public advanceWorkflowState(orderId: string){
    this.store.dispatch(WorkflowPageActions.AdvanceOrderWorkflowState({orderId}))
  }
}
