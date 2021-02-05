import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Customer } from 'src/app/shared/models/customer.model';
import { Material } from 'src/app/shared/models/material.model';
import { FileUpload, OrderFile } from 'src/app/shared/models/order-file.model';
import { OrderApiService } from 'src/app/shared/services/order-api.service';
import { CustomerSelectors } from 'src/app/state/customer/selectors';
import { FileActions } from 'src/app/state/file/actions';
import { FileSelectors } from 'src/app/state/file/selectors';
import { MaterialSelectors } from 'src/app/state/material/selectors';
import { OrderPageActions } from 'src/app/state/order/actions';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  public customers$: Observable<Customer[]>;

  public materials$: Observable<Material[]>;

  public fileUploads$: Observable<FileUpload[]>;

  public formGroup:FormGroup = new FormGroup({
    name: new FormControl('',[
      Validators.required
    ]),
    customerId: new FormControl('',[
      Validators.required
    ]),
    materialId: new FormControl('',[
      Validators.required
    ]),
    dueDate: new FormControl('',[
      Validators.required,
    ]),
    notes: new FormControl(''),
  });

  constructor(
    private store: Store,
    private orderApiService: OrderApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.customers$ = this.store.select(CustomerSelectors.GetCustomers);
    this.materials$ = this.store.select(MaterialSelectors.GetMaterials);
    this.fileUploads$ = this.store.select(FileSelectors.GetFileUploads);
  }

  createOrder(){
    this.store.dispatch(OrderPageActions.CreateOrder({
      order: {...this.formGroup.value}
    }))
  }

  fileUploadComplete(fileUpload: FileUpload) {
    console.log("file UPLOADED",fileUpload)
    this.store.dispatch(FileActions.RegisterFileUpload({fileUpload}))
  }

  removeFile(event){

  }
}
