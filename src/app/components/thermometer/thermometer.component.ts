import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Server } from 'http';
import { omit, head } from 'lodash';
import { DEFAULT_WORKFLOW_STEP_STRINGS } from 'src/app/shared/constants/workflow.constants';
import { serverTimestampToDate } from 'src/app/shared/helpers';
import { ServerTimestamp } from 'src/app/shared/models/server-timestamp.model';
import { OrderWorkflow } from 'src/app/shared/models/Workflow.model';


interface DateColumn {
  step: string;
  date: string;
}

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.scss']
})
export class ThermometerComponent implements OnInit {

  @Input() orderWorkflow: OrderWorkflow;
  @Output() advance: EventEmitter<string> = new EventEmitter();
  @Output() revert: EventEmitter<string> = new EventEmitter();

  public barHeight = 20;
  public barFill = 'var(--color-accent)';
  public percentFilled: number;

  // TODO: THESE ARE 100% CORRLATED WITH THE WORKFLOW SEQUENCE
  private barFills = [0.1,0.5,1];

  public furthestStep: number;

  public orderWorkflowSteps: DateColumn[];

  constructor() { }

  ngOnInit(): void {
    this.orderWorkflowSteps = Object.entries(omit(this.orderWorkflow,'id'))
      .map(([step,st]:[string,ServerTimestamp]) => {
        return (st === null) ? {step,date: 'None'} : {step,date: serverTimestampToDate(st)};
      }
    ).sort((a,b) => 
      DEFAULT_WORKFLOW_STEP_STRINGS.indexOf(a.step) -
      DEFAULT_WORKFLOW_STEP_STRINGS.indexOf(b.step)
    );
    const furthestStep_ = this.orderWorkflowSteps.filter((ow)=>ow.date !== 'None')//..step
    this.percentFilled = this.barFills[furthestStep_.length - 1]
  }

  advanceAction(){
    this.advance.emit(this.orderWorkflow.id);
  }

  revertAction(){
    this.revert.emit(this.orderWorkflow.id);
  }

}
