import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() value!: number;
  @Input() maxValue!: number;
  @Input() color!: string;
  progress: string = "0%";

  ngOnInit() {
    this.progress =  ((this.value/this.maxValue) as any).toFixed(2) * 100 + "%";
  }
}
