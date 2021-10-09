import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent, CountdownConfig, CountdownEvent} from "ngx-countdown";
import {QuestionsService} from "../../services/questions.service";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import {Option, Question} from "../../models/model";
import Swal from "sweetalert2";
import {Utils} from "../../utils/utils";
import {CONSTANTS} from "../../constants/constants";


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild('countdown', {static: false})
  private countdown: CountdownComponent;
  @ViewChild('topicSelector', {static: false})
  private topicSelect: TopicSelectComponent
  //
  countDownConfig: CountdownConfig = {leftTime: 30, format: "mm:ss.SS", demand: true}
  questions: Question[] = [];
  questionIds: string[] = [];
  tempQuestionIds: string[] = [];
  isStart = false;
  showResult = false;
  totalAnswer = 0;
  rightAnswer = 0;
  //
  question: Question | undefined;
  alphabet = CONSTANTS.alphabet;
  score = 0;
  bonus = 11;

  constructor(private questionService: QuestionsService,
              private util: Utils) {

  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.bonus > 0 && this.isStart) {
        this.bonus--;
      }
    }, 1000);
  }

  onStart() {
    if (this.topicSelect.getSelectedTopicIds().length !== 0) {
      console.log(this.topicSelect.getSelectedTopicIds());
      this.util.showLoading();
      this.questionService.getAllIds({
        field: 'topicIds',
        op: 'array-contains-any',
        value: this.topicSelect.getSelectedTopicIds()
      }, (ids: any) => {
        this.questionIds = ids;
        this.questionService.query([{
          field: 'id',
          op: 'in',
          value: this.questionIds,
          limit: 5
        }], (docs: Question[]) => {
          this.util.hideLoading();
          this.questions.push(...docs);
          let random = Math.floor(Math.random() * this.questions.length);
          this.loadQuestion(this.questions[random]);
          this.isStart = true;
          this.showResult = false;
          this.countdown.begin();
        });
      });
    } else {
      Swal.fire('Bạn phải chọn ít nhất một chủ đề', '', 'error').then(r => {
        //do nothing :))
      });
    }
  }

  onOptionSelect(option: Option) {
    this.countdown.pause();
    let score = 0;
    if (option.correct) {
      this.rightAnswer++;
      score = 10 + this.bonus;
      this.questionIds = this.questionIds.filter((id) => id !== this.question?.id);
      this.tempQuestionIds.push(<string>this.question?.id);
      if (this.questionIds.length < 1) {
        this.questionIds.push(...this.tempQuestionIds);
        this.tempQuestionIds = [];
      }
    }
    console.log(this.questionIds);
    console.log(this.tempQuestionIds);

    this.questions = this.questions.filter((q) => q.id !== this.question?.id);
    this.totalAnswer++;
    let html = ''
    // if (this.score < 100 && this.score + score > 100) {
    //   html = '<img src="/assets/100.gif" alt="loading" style="width: 200px;height: auto"/>'
    // }
    this.score += score;
    this.bonus = 11;
    if (this.questions.length < 3) {
      this.questionService.query([{
        field: 'id',
        op: 'in',
        value: this.questionIds,
        limit: 5
      }], (docs: Question[]) => {
        this.questions.push(...docs);
      });
    }
    Swal.fire({
      icon: option.correct ? 'success' : 'error',
      showConfirmButton: false,
      title: score != 0 ? ('+ ' + score) : '',
      html: html
    });
    setTimeout(() => {
      this.loadQuestion(this.questions[Math.floor(Math.random() * this.questions.length)]);
      Swal.close();
      this.countdown.resume();
    }, 1000);
  }

  onTimerCount(event: CountdownEvent): void {
    if (event.action === "done") {
      this.isStart = false;
      this.showResult = true;
    }
  }

  loadQuestion(q: Question) {
    this.question = q;
    this.question.options = this.shuffle(this.question.options);
  }

  shuffle(array: Option[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

}
