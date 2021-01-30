import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

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

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  public createItem(){
    this.router.navigate(['/create']);

  }

  public itemSelected(selectedItem){
    console.log('selectedItem',selectedItem)
  }

}
