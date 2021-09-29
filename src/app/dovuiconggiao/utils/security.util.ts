import {Injectable} from "@angular/core";
import {AngularFirestore, DocumentSnapshot} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../models/model";
import {UsersService} from "../services/users.service";
import {Utils} from "./utils";
import Swal from "sweetalert2";

@Injectable({providedIn: "root"})
export class SecurityUtil {

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private userService: UsersService, private utils: Utils) {

  }

  getCurrentUser(onUserExist: any, onUserNull: any) {
    this.utils.showLoading();
    this.auth.currentUser.then((u) => {
      if (!u) {
        onUserNull();
      }
    });
    this.auth.authState.subscribe((u) => {
      if (u) {
        let user: User = {name0: null, id: "", roles: []};
        user.name0 = u.displayName;
        user.id = u.uid;
        this.userService.get(user.id, (ds: DocumentSnapshot<User>) => {
          if (ds.exists) {
            user.roles = ds.data().roles;
          }
          onUserExist(user);
          this.utils.hideLoading();
        }, (err: any) => {
          console.log(err);
        });
      } else {
        onUserNull();
        this.utils.hideLoading();
      }
    });
  }

  logout(callback: any): void {
    Swal.fire({
      title: 'Bạn chắc khum?',
      icon: "question",
      confirmButtonText: 'Chắc!',
      cancelButtonText: 'Khum',
      showCancelButton: true
    }).then(value => {
      if (value.isConfirmed) {
        this.auth.signOut().then(callback());
      }
    });
  }

}
