import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {Option, Question, User} from "../../models/model";
import {ActivatedRoute, Router} from "@angular/router";
import {CONSTANTS, QUESTION_STATUS, ROLES} from "../../constants/constants";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";
import Swal from "sweetalert2";
import {QuestionsService} from "../../services/questions.service";
import {DocumentSnapshot} from "@angular/fire/firestore";
import {SecurityUtil} from "../../utils/security.util";
import {Utils} from "../../utils/utils";
import {Location} from '@angular/common';
import {QuestionQuery, QuestionStore} from "../../repository/question.store";
import {DomSanitizer} from '@angular/platform-browser';

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
    createdTime: '',
    status: 0
  };
  alphabet = CONSTANTS.alphabet;
  disableAuthor: boolean = false;
  status = QUESTION_STATUS;
  isAdmin: boolean | undefined = false;
  stt = true;
  isPreview = false;

  imgUrl = "";
  imgFile: any;
  imgToString = "";
  finalJson = {};
  imgSrc: any;

  currentId: number = 0;

  constructor(private route: ActivatedRoute,
              private questionsService: QuestionsService,
              private router: Router,
              private security: SecurityUtil,
              private util: Utils,
              private location: Location,
              private localStore: QuestionStore,
              private localQuery: QuestionQuery,
              private domSan: DomSanitizer) {
    this.questionId = this.route.snapshot.paramMap.get('id');

  }

  userCheck(user: User) {
    this.question.author = user;
    this.disableAuthor = true;
    this.isAdmin = user.roles?.includes(ROLES.ADMIN);
  }

  ngOnInit(): void {
    if (this.security.currentUser) {
      this.userCheck(this.security.currentUser);
    } else {
      this.security.getCurrentUser((user: User) => {
        this.userCheck(user);
      }, () => {
      });
    }

    if (this.questionId) {
      if (this.localQuery.hasEntity(this.questionId)) {
        this.question = {...<Question>this.localQuery.getEntity(this.questionId)};
        let options = this.question.options;
        this.question.options = [];
        options.forEach((o) => {
          this.question.options.push({...o});
        });
        this.topicSelect?.topicsFormControl.setValue(this.question!.topicIds);
      } else {
        this.questionsService.get(this.questionId, (ds: DocumentSnapshot<Question>) => {
          if (ds.exists) {
            this.question = ds.data();
            this.topicSelect?.topicsFormControl.setValue(this.question!.topicIds);
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

      if (this.question.img) {
        this.imgSrc = this.domSan.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.question.img}`);
      }
    } else {
      for (let i = 0; i < 4; i++) {
        let emptyOption: Option = {content: "", correct: false, id: "", img: "", questionId: ""}
        this.question!.options.push(emptyOption);
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
        this.util.showLoading();
        //add Question
        if (this.imgToString != "") {
          this.question.img = this.imgToString;
        }
        this.question.topicIds = this.topicSelect!.topicsFormControl.value;
        this.question.topics = this.topicSelect!.getSelectedTopics();
        this.question.createdTime = submitDate.toDateString();
        this.question.authorId = this.question.author?.id;
        this.questionsService.create(this.question, () => {
          this.util.hideLoading();
          Swal.fire('OK gòi đó!', '', 'success').then(r => {
            this.back();
          });
        }, (err: any) => {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        });

      } else {
        this.util.showLoading();
        if (this.imgToString != "") {
          this.question.img = this.imgToString;
        }
        this.question.topicIds = this.topicSelect!.topicsFormControl.value;
        this.question.topics = this.topicSelect!.getSelectedTopics();
        this.question.createdTime = submitDate.toDateString();
        this.questionsService.update(this.questionId, this.question, () => {
          this.util.hideLoading();
          Swal.fire('OK gòi đó!', '', 'success').then(r => {
            this.router.navigateByUrl('admin');
          });
        }, (err: any) => {
          console.log(this.imgToString);
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        });
      }
    }
  }

  back(): void {
    this.location.back();
  }

  approvalQuestion(status: string): void {
    if (!status) {
      Swal.fire('Something false', '', 'error').then(r => {
        //do nothing :))
      });

    } else {
      if (!this.questionId) {
        Swal.fire('Something false', '', 'error').then(r => {
          //do nothing :))
        });
      } else {
        if (status == 'approved') {
          this.question.status = 1;
        } else {
          this.question.status = 2;
        }
        this.util.showLoading();
        this.question.topicIds = this.topicSelect!.topicsFormControl.value;
        this.questionsService.update(this.questionId, this.question, () => {
          this.localStore.upsert(this.questionId!, this.question);
          this.util.hideLoading();
          Swal.fire('OK gòi đó!', '', 'success').then(r => {
            this.back();
          });
        }, (err: any) => {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        });
      }
    }
  }


  public picked(event: any) {
    this.imgUrl = event.target.files[0].name;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.imgFile = file;
      this.handleInputChange(file);
    } else {
      alert("No file selected");
    }
  }


  handleInputChange(files: any) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.imgToString = base64result;
    this.imgSrc = this.domSan.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64result}`);
    // console.log(this.question.img);

  }

  preview() {
    this.isPreview = true;
  }

  clearImg() {
    this.imgToString = "";
    this.imgUrl = "";
    this.imgSrc = "";
  }
}
