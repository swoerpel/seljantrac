import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { head } from 'lodash';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  @Input() data: any;
  @Output() removeAction: EventEmitter<any> = new EventEmitter<any>()
  @Output() addAction: EventEmitter<any> = new EventEmitter<any>()

  public displayedColumns: string[];

  public customerName: FormControl = new FormControl('',[Validators.required]);

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = [...Object.keys(head(this.data)), 'action'];
  }

  removeItem(item){
    this.removeAction.emit(item)
  }

  addItem(){
    this.addAction.emit(this.customerName.value)
  }

}
