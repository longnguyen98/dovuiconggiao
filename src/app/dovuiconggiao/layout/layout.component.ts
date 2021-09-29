import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../models/model";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: User;

  constructor(private fAuth: AngularFireAuth) {
    fAuth.user.subscribe((u) => {
      if (u) {
        this.user = {name0: null, id: ""};
        this.user.name0 = u.displayName;
        this.user.id = u.uid;
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    $('.nav-link').on('click', function () {
      $('.nav-link.active').removeClass('active');
      $(this).addClass('active');
    });
  }

}
