import {Injectable} from "@angular/core";
import {AngularFirestore, DocumentSnapshot} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../models/model";
import {UsersService} from "../services/users.service";
import {Utils} from "./utils";
import Swal from "sweetalert2";

@Injectable({providedIn: "root"})
export class SecurityUtil {

  currentUser: User | null = null;

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
        this.userService.get(u.uid, (ds: DocumentSnapshot<User>) => {
          if (ds.exists) {
            this.currentUser = ds.data();
            onUserExist(ds.data());
          }
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
