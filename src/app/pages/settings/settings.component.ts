import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EditListText } from 'src/app/components/edit-list/edit-list.component';
import { Customer } from 'src/app/shared/models/customer.model';
import { Material } from 'src/app/shared/models/material.model';
import { CustomerPageActions } from 'src/app/state/customer/actions';
import { CustomerSelectors } from 'src/app/state/customer/selectors';
import { MaterialPageActions } from 'src/app/state/material/actions';
import { MaterialSelectors } from 'src/app/state/material/selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public customers$: Observable<Customer[]>;
  public materials$: Observable<Material[]>;

  public customerSettingsText: EditListText = {
    title: 'Customer',
    subtitle: 'Add or Remove'
  }

  public materialSettingsText: EditListText = {
    title: 'Material',
    subtitle: 'Add or Remove'
  }

  public customerName: FormControl = new FormControl('',[Validators.required]);
  public materialName: FormControl = new FormControl('',[Validators.required]);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {

    this.customers$ = this.store.select(CustomerSelectors.GetCustomers).pipe(
      filter((c)=>c.length > 0)
    );

    this.materials$ = this.store.select(MaterialSelectors.GetMaterials).pipe(
      filter((c)=>c.length > 0)
    );
  }

  public removeCustomer(customer){
    this.store.dispatch(CustomerPageActions.DeleteCustomer({customerId: customer.id}));
  }

  public addCustomer(){
    const name = this.customerName.value;
    this.store.dispatch(CustomerPageActions.CreateCustomer({name}))
  }


  // TODO: Dig into materials a bit more and add these calls
  public removeMaterial(material){
    console.log('material',material)
    const materialId = material.id;
    this.store.dispatch(MaterialPageActions.DeleteMaterial({materialId}))
  }

  public createMaterial(){
    const name = this.materialName.value;
    this.store.dispatch(MaterialPageActions.CreateMaterial({name}))
  }


}
