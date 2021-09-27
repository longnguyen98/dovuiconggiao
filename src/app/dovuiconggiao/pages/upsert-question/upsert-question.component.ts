import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {Option, Question} from "../../models/model";
import {ActivatedRoute, Router} from "@angular/router";
import {CONSTANTS} from "../../constants/constants";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import Swal from "sweetalert2";
import {QuestionsService} from "../../services/questions.service";
import {v4 as uuid} from 'uuid';
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Component({
  selector: 'app-upsert-question',
  templateUrl: './upsert-question.component.html',
  styleUrls: ['./upsert-question.component.css']
})
export class UpsertQuestionComponent implements OnInit {
  @ViewChild('topicSelectComponent', {static: true})
  topicSelect?: TopicSelectComponent;

  questionId: string | null;
  question: Question = {
    topicIds: [],
    authorId: "",
    content: "",
    id: "",
    img: "",
    options: [],
    topics: [],
    author: {id: '', name0: '', location: ''}
  };
  alphabet = CONSTANTS.alphabet;


  constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private router: Router) {
    this.questionId = this.route.snapshot.paramMap.get('id');
    console.log('questionId: ', this.questionId);
  }

  ngOnInit(): void {
    //log list question
    console.log('QUESTIONS LIST');
    this.questionsService.list().then((qs) => {
      qs.forEach((doc) => {
        console.log(doc.data());
      });
    });
    if (!this.questionId) {
      for (let i = 0; i < 4; i++) {
        let emptyOption: Option = {content: "", correct: false, id: "", img: "", questionId: ""}
        this.question.options.push(emptyOption);
      }
    }
  }

  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=question]').addClass('active');

  }

  addOption(): void {
    this.question.options.push({content: "", correct: false, id: "", img: "", questionId: ""});
  }

  removeOption(index: number): void {
    this.question.options.splice(index, 1);
  }

  correctCheckboxEvent(index: number): void {
    this.question.options.forEach((o, i) => {
      o.correct = index === i;
    });
  }


  submitQuestion(): void {
    if (!this.question.options.some((o) => o.correct)) {
      Swal.fire('Phải có ít nhất 1 đáp án đúng', '', 'error').then(r => {
        //do nothing :))
      });
    } else {
      if (!this.questionId) {
        //add Question
        this.question.id = uuid();
        this.question.topicIds = this.topicSelect!.topicsFormControl.value;
        this.question.topics = this.topicSelect!.getSelectedTopics();
        this.questionsService.createOrUpdate(this.question).then(() => {
          Swal.fire('OK gòi đó!', '', 'success').then(r => {
            this.router.navigateByUrl('/');
          });
        }).catch(err => {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        })
      }
    }
  }

}
