import {Injectable} from "@angular/core";
import {QuestionsService} from "./questions.service";
import {TopicsService} from "./topics.service";
import {Question, ReportData, Topic} from "../models/model";

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  constructor(private questionService: QuestionsService, private topicService: TopicsService) {

  }

  getQuestionsReport(onUpdateView: any): void {
    this.topicService.list().then((qs) => {
      qs.forEach((doc) => {
        let topic = <Topic>doc.data();
        let reportData: ReportData = {topic: topic, questionCount: 0}
        this.questionService.getAllIds({
          field: 'topicIds',
          op: 'array-contains',
          value: topic.id
        }, (ids: any) => {
          reportData.questionCount = ids.length;
        });
        onUpdateView(reportData);
      });
    });
  }
}
