import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { head } from 'lodash';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() data: any[];
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  
  public selection = new SelectionModel<any>(true, []);

  public displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = Object.keys(head(this.data));
  }

  public selectItem(rowItem){
    this.itemSelected.emit(rowItem)
  }

}
