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
  selector: 'app-workflow-thermometer',
  templateUrl: './workflow-thermometer.component.html',
  styleUrls: ['./workflow-thermometer.component.scss']
})
export class WorkflowThermometerComponent implements OnInit {

  @Input() workflowSteps: string[] = DEFAULT_WORKFLOW_STEP_STRINGS;
  @Input() orderWorkflow: OrderWorkflow;
  @Output() advance: EventEmitter<string> = new EventEmitter();
  @Output() revert: EventEmitter<string> = new EventEmitter();

  public percentFilled: any;

  public furthestStep: string;

  public orderWorkflowSteps: DateColumn[];

  // TODO: THESE ARE 100% CORRLATED WITH THE WORKFLOW SEQUENCE
  private barFills = {
    [this.workflowSteps[0]]: 0.1,
    [this.workflowSteps[1]]: 0.5,
    [this.workflowSteps[2]]: 1,
  }

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
      this.workflowSteps.indexOf(a.step) -
      this.workflowSteps.indexOf(b.step)
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
