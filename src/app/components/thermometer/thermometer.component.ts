import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { omit } from 'lodash';
import { DEFAULT_WORKFLOW_STEP_STRINGS } from 'src/app/shared/constants/workflow.constants';
import { serverTimestampToDate } from 'src/app/shared/helpers';
import { ServerTimestamp } from 'src/app/shared/models/server-timestamp.model';
import { OrderWorkflow } from 'src/app/shared/models/Workflow.model';
import { last } from 'lodash';

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
  public percentFilled: any;

  // TODO: THESE ARE 100% CORRLATED WITH THE WORKFLOW SEQUENCE
  private barFills = {
    created: 0.1,
    started: 0.5,
    completed: 1,
  }

  public furthestStep: string;

  public orderWorkflowSteps: DateColumn[];

  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(){
    this.refresh();
  }

  refresh(){
    this.orderWorkflowSteps = Object.entries(omit(this.orderWorkflow,'id'))
      .map(([step,st]:[string,ServerTimestamp]): DateColumn => 
        (st === null) ? {step,date: 'None'} : {step,date: serverTimestampToDate(st)}
    ).sort((a: DateColumn, b: DateColumn) => 
      DEFAULT_WORKFLOW_STEP_STRINGS.indexOf(a.step) -
      DEFAULT_WORKFLOW_STEP_STRINGS.indexOf(b.step)
    );
    this.furthestStep = last(this.orderWorkflowSteps.filter((ow)=>ow.date !== 'None').map(dc=>dc.step));
    this.percentFilled = this.barFills[this.furthestStep]

  }

  advanceAction(){
    this.advance.emit(this.orderWorkflow.id);
  }

  revertAction(){
    this.revert.emit(this.orderWorkflow.id);
  }

}
