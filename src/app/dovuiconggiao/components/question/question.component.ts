import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  constructor(private questionService: QuestionsService) {
  }

  ngOnInit(): void {
    // this.questionService.addQuestions({authorId: "", content: "zxczxc", id: "", img: "zxczxczxc", options: [], topics: []});
  }

}
