import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/shared/models/customer.model';
import { Order } from 'src/app/shared/models/order.model';
import { CustomerSelectors } from 'src/app/state/customer/selectors';
import { OrderPageActions } from 'src/app/state/order/actions';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {


  public customers$: Observable<Customer[]>;

  public materials$ = of([
    'mild',
    'aluminim',
    'stainless',
    'galvanized',
  ])

  public formGroup:FormGroup = new FormGroup({
    name: new FormControl('',[
      Validators.required
    ]),
    customerId: new FormControl('',[
      Validators.required
    ]),
    material: new FormControl('',[
      Validators.required
    ]),
    dueDate: new FormControl('',[
      Validators.required,
    ]),
    notes: new FormControl()
  });

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.customers$ = this.store.select(CustomerSelectors.GetCustomers);
    this.formGroup.valueChanges.pipe(
      tap((r)=>console.log(r))
    ).subscribe();
  }

  createOrder(){
    console.log('partial order',this.formGroup.value)
    this.store.dispatch(OrderPageActions.CreateOrder({
      order: {...this.formGroup.value}
    }))
  }

}
