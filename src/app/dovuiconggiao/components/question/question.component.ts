import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {QuerySnapshot} from "@angular/fire/firestore";
import {Question} from "../../models/model";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  constructor(private questionService: QuestionsService) {
  }

  ngOnInit(): void {
    // this.questionService.createOrUpdate({
    //   id: "",
    //   authorId: "",
    //   content: "zxczxc",
    //   img: "zxczxczxc",
    //   options: [],
    //   topics: []
    // }).then(r => {
    //   console.log(r);
    // }).catch(err => {
    //   console.log(err);
    //   alert('ERROR');
    // });

    // this.questionService.list().then(function (r: QuerySnapshot) {
    //   console.log(r);
    // });
    let list: any[] = [];
    this.questionService.list().then((qs: QuerySnapshot<Question>) => {
      qs.forEach((doc:any) => {
        list.push(doc.data());
      });
      console.log(list);
    });
  }

}
