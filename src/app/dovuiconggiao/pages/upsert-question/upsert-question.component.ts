import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FirebaseInit} from "../../firebase/firebase.init";
import firebase from "firebase/compat";

@Component({
  selector: 'app-upsert-question',
  templateUrl: './upsert-question.component.html',
  styleUrls: ['./upsert-question.component.css']
})
export class UpsertQuestionComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=question]').addClass('active');
  }

}
