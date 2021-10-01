import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent, CountdownConfig, CountdownEvent} from "ngx-countdown";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild('countdown', {static: true})
  private countdown: CountdownComponent;
  countDownConfig: CountdownConfig = {leftTime: 60, format: "mm:ss.SS", demand: true}

  constructor() {
  }

  ngOnInit(): void {
  }

  onStart() {
    this.countdown.begin();
  }

  onTimeout(event: CountdownEvent): void {
    if (event.action === "done") {

    }
  }

}
