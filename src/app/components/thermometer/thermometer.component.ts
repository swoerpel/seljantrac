import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Server } from 'http';
import { omit, head } from 'lodash';
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

  public barHeight = 20;
  public barFill = 'var(--color-accent)';
  public percentFilled:number;

  private defaultStepOrder = {
    created: 0.1,
    started: 0.5,
    completed: 1,
  }

  public furthestStep: number;

  @Input() orderWorkflow: OrderWorkflow;

  public orderWorkflowSteps: DateColumn[];

  constructor() { }

  ngOnInit(): void {
    this.orderWorkflowSteps = Object.entries(omit(this.orderWorkflow,'id'))
      .map(([step,st]:[string,ServerTimestamp]) => 
        (st === null) ? {step,date: 'None'} : {step,date: serverTimestampToDate(st)}
    ).sort((a,b) => this.defaultStepOrder[a.step] - this.defaultStepOrder[b.step])
    this.furthestStep = head(this.orderWorkflowSteps.filter((ow)=>ow.date !== 'None')).step
    this.percentFilled = this.defaultStepOrder[this.furthestStep]
  }

}
