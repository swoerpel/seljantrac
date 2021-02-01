import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { head } from 'lodash';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { CustomerPageActions } from 'src/app/state/customer/actions';
import { Customer } from 'src/app/shared/models/customer.model';
import { CustomerSelectors } from 'src/app/state/customer/selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public customers$: Observable<Customer[]>
  public customersTitle: string = "Customers";
  public customersSubtitle: string = "Add or Remove";
  public selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public customerSettings = {
    title: 'Customers',
  }

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.customers$ = this.store.select(CustomerSelectors.GetCustomers).pipe(
      filter((c)=>c.length > 0)
    );
  }

  public removeCustomer(customer){
    this.store.dispatch(CustomerPageActions.DeleteCustomer({customerId: customer.id}));
  }

  public addCustomer(name){
    this.store.dispatch(CustomerPageActions.CreateCustomer({name}))
  }

}
