import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { LoadingState } from 'src/app/shared/enums/loading-state.enum';
import { Customer } from 'src/app/shared/models/customer.model';
import { Order } from 'src/app/shared/models/order.model';
import { CustomerSelectors } from 'src/app/state/customer/selectors';
import { OrderPageActions } from 'src/app/state/order/actions';
import { OrderSelectors } from 'src/app/state/order/selectors';

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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.customers$ = this.store.select(CustomerSelectors.GetCustomers);
  }

  createOrder(){
    this.store.dispatch(OrderPageActions.CreateOrder({
      order: {...this.formGroup.value}
    }))

    this.store.select(OrderSelectors.GetLoadingState).pipe(
      filter((ls: LoadingState)=> ls === LoadingState.Stable),
      take(1),
      tap((_) => this.router.navigate([''])),
    ).subscribe();

  }

}
