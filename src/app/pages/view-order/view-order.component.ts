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
import { FileUpload } from 'src/app/shared/models/order-file.model';
import { FileApiService } from 'src/app/shared/services/file-upload-api.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  public completeOrder$: Observable<CompleteOrder>;
  public orderWorkflow$: Observable<OrderWorkflow>;
  public fileUploads$: Observable<FileUpload[]>;

  constructor(
    private store: Store,
    private router: Router,
    private fileApiService: FileApiService,
  ) { }

  ngOnInit(): void {

    // for handling refresh
    this.store.select(OrderSelectors.GetSelectedOrderId).pipe(
      filter((orderId) => orderId === null),
      first(),
      tap(()=>{
        let orderId = last(this.router.url.split('/'));
        this.store.dispatch(OrderPageActions.SelectOrder({orderId}))
      })
    ).subscribe();

    this.completeOrder$ = this.store.select(OrderSelectors.GetSelectedCompleteOrder);
    this.fileUploads$ = this.store.select(OrderSelectors.GetSelectedOrderFileUploads);
    this.orderWorkflow$ = this.store.select(WorkflowSelectors.GetSelectedOrderWorkflow).pipe(filter(ow=>!!ow));

  }

  public revertWorkflowState(orderId: string){
    this.store.dispatch(WorkflowPageActions.RevertOrderWorkflowState({orderId}))
  }

  public advanceWorkflowState(orderId: string){
    this.store.dispatch(WorkflowPageActions.AdvanceOrderWorkflowState({orderId}))
  }

  public downloadFile(fileUpload: FileUpload){
    this.fileApiService.download(fileUpload).pipe(
      first(),
      tap((blob: Blob)=>{
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = fileUpload.name;
          a.click();
          URL.revokeObjectURL(objectUrl);
      })
    ).subscribe();
  }
}