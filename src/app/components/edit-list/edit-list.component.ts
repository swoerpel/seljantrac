import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { head } from 'lodash';

export interface EditListText{
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit, AfterViewInit,OnChanges {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: any;
  @Input() text: EditListText;
  
  @Output() removeAction: EventEmitter<any> = new EventEmitter<any>()

  public displayedColumns: string[];


  public dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = ['index',...Object.keys(head(this.data)),'action'];
    console.log('text',this.text)
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.data.map((d,i)=>({...d,index: i+1})));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource<any>(this.data.map((d,i)=>({...d,index: i+1})));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(!!this.table){
      this.table.renderRows();
    }
    
  }

  removeItem(item){
    this.removeAction.emit(item)
  }

}
