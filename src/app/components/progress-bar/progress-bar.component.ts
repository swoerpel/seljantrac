import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as chroma from 'chroma.ts';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {

  @Input() barHeight = 20;
  @Input() progress: number = 0;
  @Input() colors: string[] = ['red','yellow','green'];

  public fillColor: string;

  constructor() { }

  ngOnChanges(){
    const colorMachine: chroma.Scale = chroma.scale(this.colors)
    this.fillColor = colorMachine(this.progress).hex();
  }

}
