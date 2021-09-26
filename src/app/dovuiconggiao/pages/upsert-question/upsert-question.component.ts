import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {Option, Question} from "../../models/model";
import {ActivatedRoute} from "@angular/router";
import {CONSTANTS} from "../../constants/constants";
import {TopicSelectComponent} from "../../components/topic-select/topic-select.component";

@Component({
  selector: 'app-upsert-question',
  templateUrl: './upsert-question.component.html',
  styleUrls: ['./upsert-question.component.css']
})
export class UpsertQuestionComponent implements OnInit {
  @ViewChild('topicSelectComponent', {static: true})
  topicSelect?: TopicSelectComponent;

  questionId: string | null;
  question: Question = {topicIds: [], authorId: "", content: "", id: "", img: "", options: [], topics: []};
  alphabet = CONSTANTS.alphabet;


  constructor(private route: ActivatedRoute) {
    this.questionId = this.route.snapshot.paramMap.get('id');
    console.log('questionId: ', this.questionId);
  }

  ngOnInit(): void {
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
    this.question.topicIds = this.topicSelect!.topicsFormControl.value;
    console.log(this.question);
  }

}
