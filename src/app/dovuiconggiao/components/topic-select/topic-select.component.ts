import {Component, OnInit} from '@angular/core';
import {Topic} from "../../models/model";
import {FormControl} from "@angular/forms";
import {TopicsService} from "../../services/topics.service";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Component({
  selector: 'topic-select',
  templateUrl: './topic-select.component.html',
  styleUrls: ['./topic-select.component.css']
})
export class TopicSelectComponent implements OnInit {

  topics: Topic[] = [];
  topicsFormControl = new FormControl();
  loading = true;

  constructor(private topicService: TopicsService) {
    topicService.list().then((qs: QuerySnapshot) => {
      if (!qs.empty) {
        let topics: Topic[] = [];
        qs.forEach(function (doc) {
          topics.push(<Topic>doc.data());
        });
        this.topics = topics.sort(function (a, b) {
          return a.order - b.order;
        });
        this.loading = false;
      }
    });
  }

  getSelectedTopics(): Topic[] {
    if (!this.topicsFormControl.value) {
      return [];
    }
    return this.topics.filter((t) => {
      let ids: string[] = this.topicsFormControl.value;
      return ids.includes(t.id);
    });
  }

  ngOnInit(): void {

  }

}
