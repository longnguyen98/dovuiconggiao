import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../models/model";
import {Utils} from "../utils/utils";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: User | null;

  constructor(private fAuth: AngularFireAuth, private utils: Utils, private route: Router) {
    fAuth.user.subscribe((u) => {
      if (u) {
        this.user = {name0: null, id: ""};
        this.user.name0 = u.displayName;
        this.user.id = u.uid;
      } else {
        this.user = null;
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

  logout() {
    Swal.fire({
      title: 'Bạn chắc khum?',
      icon: "question",
      confirmButtonText: 'Chắc!',
      cancelButtonText: 'Khum',
      showCancelButton: true
    }).then(value => {
      if (value.isConfirmed) {
        this.utils.showLoading();
        this.fAuth.signOut().then(() => {
          this.utils.hideLoading();
          this.route.navigateByUrl("/");
        });
      }
    });
  }
}
