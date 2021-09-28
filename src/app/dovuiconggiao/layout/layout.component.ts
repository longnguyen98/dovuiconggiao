import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() {
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
