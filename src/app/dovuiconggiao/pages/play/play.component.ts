import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent, CountdownConfig, CountdownEvent} from "ngx-countdown";
import {QuestionsService} from "../../services/questions.service";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import {QueryDocumentSnapshot} from "@angular/fire/firestore";
import {Question} from "../../models/model";
import Swal from "sweetalert2";
import {Utils} from "../../utils/utils";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild('countdown', {static: true})
  private countdown: CountdownComponent;
  @ViewChild('topicSelector', {static: false})
  private topicSelect: TopicSelectComponent
  //
  countDownConfig: CountdownConfig = {leftTime: 60, format: "mm:ss.SS", demand: true}
  questions: Question[] = [];

  constructor(private questionService: QuestionsService,
              private util: Utils) {

  }

  ngOnInit(): void {
  }

  onStart() {
    if (this.topicSelect.getSelectedTopicIds().length !== 0) {
      this.util.showLoading();
      this.questionService.query([{
        field: 'topicIds',
        op: 'array-contains-any',
        value: this.topicSelect.topicsFormControl.value
      }], (docs: Question[]) => {
        this.util.hideLoading();
        this.questions = docs;
      });
    } else {
      Swal.fire('Êi bro, phải chọn ít nhất 1 chủ đề nhen', '', 'error').then(r => {
        //do nothing :))
      });
    }
    // this.countdown.begin();
  }

  onTimeout(event: CountdownEvent): void {
    if (event.action === "done") {

    }
  }

}
