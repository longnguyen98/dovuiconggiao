import {Component, Injectable, OnInit} from '@angular/core';
import {User} from "../../models/model";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
@Injectable({providedIn: 'root'})
export class AuthenticationComponent implements OnInit {
  user: User;

  constructor() {

  }

  ngOnInit(): void {
  }

}
