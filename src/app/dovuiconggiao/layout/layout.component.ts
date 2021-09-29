import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../models/model";
import {Utils} from "../utils/utils";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ROLES} from "../constants/constants";
import {SecurityUtil} from "../utils/security.util";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: User | null;
  roles = ROLES;

  constructor(private fAuth: AngularFireAuth, private utils: Utils, private route: Router, private security: SecurityUtil) {
    security.getCurrentUser((user: User) => {
      this.user = user;
    }, () => {
      this.user = null;
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
    this.security.logout(() => {
      this.user = null;
      this.route.navigateByUrl("/");
    });
  }
}
