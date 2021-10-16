import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent, CountdownConfig, CountdownEvent} from "ngx-countdown";
import {QuestionsService} from "../../services/questions.service";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import {Option, Question, Record} from "../../models/model";
import Swal from "sweetalert2";
import {Utils} from "../../utils/utils";
import {CONSTANTS} from "../../constants/constants";
import {RecordService} from "../../services/record.service";
import {SecurityUtil} from "../../utils/security.util";


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
  topicId = '';
  //
  question: Question | undefined;
  alphabet = CONSTANTS.alphabet;
  score = 0;
  bonus = 11;

  constructor(private questionService: QuestionsService,
              private util: Utils,
              private recordService: RecordService,
              private security: SecurityUtil) {

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
      this.util.showLoading();
      this.topicId = this.topicSelect.getSelectedTopicIds()[0];
      this.questionService.getAllIds({
        field: 'topicIds',
        op: 'array-contains-any',
        value: this.topicSelect.getSelectedTopicIds()
      }, (ids: any) => {
        this.questionIds = ids;
        let random = Math.floor(Math.random() * this.questionIds.length - 5);
        this.questionService.query([{
          field: 'id',
          op: 'in',
          value: this.questionIds.splice(random, random + 4),
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
    } else {
      score = -10;
    }
    this.questions = this.questions.filter((q) => q.id !== this.question?.id);
    this.totalAnswer++;
    let html = ''
    // if (this.score < 100 && this.score + score > 100) {
    //   html = '<img src="/assets/100.gif" alt="loading" style="width: 200px;height: auto"/>'
    // }
    this.score += score;
    this.bonus = 11;
    if (this.questions.length < 3) {
      let random = Math.floor(Math.random() * this.questionIds.length - 5);
      this.questionService.query([{
        field: 'id',
        op: 'in',
        value: this.questionIds.splice(random, random + 4),
        limit: 5
      }], (docs: Question[]) => {
        this.questions.push(...docs);
      });
    }
    Swal.fire({
      icon: option.correct ? 'success' : 'error',
      showConfirmButton: false,
      title: score > 0 ? ('+ ' + score) : score + '',
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
      //
      if (this.security.currentUser !== null) {
        let record: Record = {
          rightAnswer: this.rightAnswer,
          totalAnswer: this.totalAnswer,
          createdDate: new Date().toDateString(),
          id: "",
          score: this.score,
          topicId: this.topicId,
          userId: this.security.currentUser!.id
        };
        this.recordService.create(record, () => {
        }, () => {
        });
      }
    }
  }

  saveRecord(record: Record) {


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
