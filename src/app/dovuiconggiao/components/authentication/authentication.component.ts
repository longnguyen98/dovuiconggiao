import {Component, Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../../models/model";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
@Injectable({providedIn: 'root'})
export class AuthenticationComponent implements OnInit {
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

  currentUser(): any {
    return this.fAuth.user.toPromise();
  }

  ngOnInit(): void {
  }

}
