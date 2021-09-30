import {Component, Injectable, OnInit} from '@angular/core';
import {User} from "../../models/model";
import {FirebaseuiAngularLibraryService, FirebaseUISignInSuccessWithAuthResult} from "firebaseui-angular";
import {UsersService} from "../../services/users.service";
import {SecurityUtil} from "../../utils/security.util";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
@Injectable({providedIn: 'root'})
export class AuthenticationComponent implements OnInit {
  user: User;

  constructor(private usersService: UsersService, private securiy: SecurityUtil, private router: Router, private fbUi: FirebaseuiAngularLibraryService) {

  }

  ngOnInit(): void {
  }

  onSuccessLogin(authResult: FirebaseUISignInSuccessWithAuthResult) {
    if (authResult.authResult.additionalUserInfo?.isNewUser) {
      let authUser = authResult.authResult.user;
      let user: User = {
        id: authUser!.uid,
        name0: authUser!.displayName,
        email: authUser!.email,
        avatar: authUser?.photoURL + '?type=large',
        roles: []
      }
      this.usersService.update(user.id, user, () => {
      }, (err: any) => {
        Swal.fire({
          title: 'Lỗi khi tạo mới người dùng :<',
          html: 'báo với mấy bạn dev nha',
          icon: 'error',
          confirmButtonText: 'Okie nha'
        }).then((value) => {
          if (value.isConfirmed) {
            this.securiy.logout(() => {
              this.router.navigateByUrl("/");
            });
          }
        });
      });
    }
  }
}
