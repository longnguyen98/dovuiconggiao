import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {Option, Question} from "../../models/model";
import {ActivatedRoute, Router} from "@angular/router";
import {CONSTANTS} from "../../constants/constants";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import Swal from "sweetalert2";
import {QuestionsService} from "../../services/questions.service";
import {AuthenticationComponent} from "../../components/authentication/authentication.component";
import {DocumentSnapshot} from "@angular/fire/firestore";

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
    author: {id: '', name0: '', location: ''},
    createdTime: ''
  };
  alphabet = CONSTANTS.alphabet;


  constructor(private route: ActivatedRoute,
              private questionsService: QuestionsService,
              private router: Router,
              private auth: AuthenticationComponent) {
    this.questionId = this.route.snapshot.paramMap.get('id');
    console.log('questionId: ', this.questionId);
  }

  ngOnInit(): void {
    if (!this.questionId) {
      for (let i = 0; i < 4; i++) {
        let emptyOption: Option = {content: "", correct: false, id: "", img: "", questionId: ""}
        this.question.options.push(emptyOption);
      }
    } else {
      this.questionsService.get(this.questionId, (ds: DocumentSnapshot<Question>) => {
        if (ds.exists) {
          this.question = ds.data();
          this.topicSelect?.topicsFormControl.setValue(this.question.topicIds);
        } else {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', '404', 'error').then(r => {
            console.log('Document doesn\'t exist: ' + this.questionId);
          });
        }
      }, (err: any) => {
        Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
          console.log(err);
        });
      });
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
    const submitDate = new Date();
    if (!this.question.options.some((o) => o.correct)) {
      Swal.fire('Phải có ít nhất 1 đáp án đúng', '', 'error').then(r => {
        //do nothing :))
      });
    } else if (this.topicSelect?.getSelectedTopics().length === 0) {
      Swal.fire('Phải có ít nhất 1 chủ đề được chọn', '', 'error').then(r => {
        //do nothing :))
      });
    } else {
      if (!this.questionId) {
        this.showLoading();
        //add Question
        this.question.topicIds = this.topicSelect!.topicsFormControl.value;
        this.question.topics = this.topicSelect!.getSelectedTopics();
        this.question.createdTime = submitDate.toDateString();
        this.questionsService.create(this.question, () => {
          Swal.close();
          Swal.fire('OK gòi đó!', '', 'success').then(r => {
            this.router.navigateByUrl('admin');
          });
        }, (err: any) => {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        });

      } else {
        this.showLoading();
        this.question.topicIds = this.topicSelect!.topicsFormControl.value;
        this.question.topics = this.topicSelect!.getSelectedTopics();
        this.question.createdTime = submitDate.toDateString();
        this.questionsService.update(this.questionId, this.question, () => {
          Swal.close();
          Swal.fire('OK gòi đó!', '', 'success').then(r => {
            this.router.navigateByUrl('admin');
          });
        }, (err: any) => {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        });
      }
    }
  }

  showLoading(): void {
    Swal.fire({
      title: 'Chờ xíu nha!',
      html: '<img src="/assets/loading.gif" alt="loading" style="width: 100px;height: auto"/>',
      showCancelButton: false,
      showConfirmButton: false
    });
  }

}
