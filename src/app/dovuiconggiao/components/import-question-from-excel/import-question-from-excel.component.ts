import {Component, OnInit} from '@angular/core';
import * as XLXS from "xlsx";
import {Option, Question, Topic} from "../../models/model";
import {QuestionsService} from "../../services/questions.service";
import {Utils} from "../../utils/utils";
import {SecurityUtil} from "../../utils/security.util";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {TopicQuery} from "../../repository/topic.store";

@Component({
  selector: 'excel-import',
  templateUrl: './import-question-from-excel.component.html',
  styleUrls: ['./import-question-from-excel.component.css']
})
export class ImportQuestionFromExcelComponent implements OnInit {

  constructor(private questionService: QuestionsService,
              private util: Utils,
              private security: SecurityUtil,
              private router: Router,
              private topicQuery: TopicQuery) {
  }

  ngOnInit(): void {
  }

  fileUpload(event: any) {
    try {
      const selectedFile = event.target.files[0];
      const fileReader = new FileReader();
      let questions: Question[] = [];
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (even: any) => {
        this.util.showLoading();
        let binaryData = even.target.result;
        let workbook = XLXS.read(binaryData, {type: 'binary'})
        let dataSheet: any[] = XLXS.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        let keys = Object.keys(dataSheet[0]);
        for (let i = 0; i < dataSheet.length; i++) {
          let row = dataSheet[i];
          let content = row[keys[0]];
          let options: Option[] = [];
          for (let j = 1; j < 5; j++) {
            let o = row[keys[j]];
            options.push({content: o, correct: false, id: "", img: "", questionId: ""});
          }
          let correctIndex = row[keys[5]];
          options[parseInt(correctIndex) - 1].correct = true;
          let topicIds = row[keys[6]];
          //
          let q: Question = {
            authorId: this.security.currentUser.id,
            content: content,
            createdTime: new Date().toDateString(),
            id: "",
            img: "",
            options: options,
            topicIds: topicIds.split(","),
            status: 0,
            author: this.security.currentUser,
            topics: []
          }
          if (q.topicIds.length !== 0) {
            q.topicIds.forEach((topicId) => {
              q.topics!.push(<Topic>this.topicQuery.getEntity(topicId));
            });
            questions.push(q);
          }
        }
        let count = 0;
        questions.forEach((q) => {
          this.questionService.create(q, () => {
            count++;
            if (count === questions.length) {
              count = 0;
              this.util.hideLoading();
              this.router.navigateByUrl("/").then(() => {
                this.router.navigateByUrl("/admin");
              });
            }
          }, (err: any) => {
            Swal.fire('Lỗi gòi', err, 'error');
          });
        });
      }
    } catch (e) {
      Swal.fire('Lỗi gòi :<', e, 'error');
    }
  }
}
