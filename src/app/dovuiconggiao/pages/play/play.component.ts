import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent, CountdownConfig, CountdownEvent} from "ngx-countdown";
import {QuestionsService} from "../../services/questions.service";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import {Question} from "../../models/model";
import Swal from "sweetalert2";
import {Utils} from "../../utils/utils";
import {from} from "rxjs";
import { QuestionComponent } from '../../components/question/question.component';

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
  @ViewChild('questionComponent', {static: true})
  private questionComponent : QuestionComponent;
  //
  countDownConfig: CountdownConfig = {leftTime: 60, format: "mm:ss.SS", demand: true}
  questions: Question[] = [];
  questionIds: string[] = [];
  isStart = false;

  //


  constructor(private questionService: QuestionsService,
              private util: Utils) {

  }

  ngOnInit(): void {
  }

  onStart() {
    if (this.topicSelect.getSelectedTopicIds().length !== 0) {
      this.util.showLoading();
      this.questionService.getAllIds({
        field: 'topicIds',
        op: 'array-contains-any',
        value: this.topicSelect.topicsFormControl.value
      }, (ids: any) => {
        console.log(ids);
        this.questionIds = ids;
        this.questionService.query([{
          field: 'id',
          op: 'in',
          value: this.questionIds,
          limit: 5
        }], (docs: Question[]) => {
          this.util.hideLoading();
          this.questions.push(...docs);
          console.log(this.questions[0]);
          this.questionComponent.question = this.questions[0];
        });
      });
      this.isStart = true;
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

  popQuestion() {
    this.questions = this.questions.slice(0, this.questions.length - 1);
    console.log('POP', this.questions);
    console.log('POP', this.questions.length);
    if (this.questions.length < 3) {
      this.questionService.query([{
        field: 'id',
        op: 'in',
        value: this.questionIds,
        limit: 5
      }], (docs: Question[]) => {
        this.questions.push(...docs);
        console.log('NEW LENGTH', this.questions.length);
      });
    }
  }

}
