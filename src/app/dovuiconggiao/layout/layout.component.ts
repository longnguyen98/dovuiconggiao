import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.afs.doc<any>('/questions/mk4EgiHwr6Xl6gvkOP7d').get().subscribe((doc) => {
      console.log(doc.data());
    });
  }

  ngAfterViewInit() {
    $('.nav-link').on('click', function () {
      $('.nav-link.active').removeClass('active');
      $(this).addClass('active');
    });
  }

}
