import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    // Swal.fire(
    //   'Đố vui Công Giáo Hello!',
    //   '',
    //   'info'
    // );
  }
  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=landing]').addClass('active');
  }

}
