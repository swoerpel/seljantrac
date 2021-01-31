import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { first } from 'rxjs/operators';
import { OrderSelectors } from 'src/app/state/order/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public mockItemData = [
    {
      id: 3325,
      name: 'misc parts',
      material: '11 gage ss',
      customer: 'jefferson',
      creator: 'dreyfus',
    },
    {
      id: 6645,
      name: 'old useless parts',
      material: '12 gage ms',
      customer: 'phillip',
      creator: 'rivers',
    },
    {
      id: 2275,
      name: 'fast bike',
      material: 'bike parts',
      customer: 'louis',
      creator: 'pete',
    },
    {
      id: 2275,
      name: 'fast bike',
      material: 'bike parts',
      customer: 'louis',
      creator: 'pete',
    },
    {
      id: 2275,
      name: 'fast bike',
      material: 'bike parts',
      customer: 'louis',
      creator: 'pete',
    },
  ]

  public orders$: Observable<any>;

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.orders$ = this.store.select(OrderSelectors.GetOrders).pipe(
      filter(orders=>orders.length > 0),
    )
  }

  public createItem(){
    this.router.navigate(['/create']);

  }

  public itemSelected(selectedItem){
    console.log('selectedItem',selectedItem)
  }

}
