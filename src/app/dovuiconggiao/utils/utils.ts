import {Injectable} from "@angular/core";
import Swal from "sweetalert2";

@Injectable({providedIn: "root"})
export class Utils {
  showLoading(): void {
    Swal.fire({
      title: 'Chờ xíu nha!',
      html: '<img src="/assets/loading.gif" alt="loading" style="width: 100px;height: auto"/>',
      showCancelButton: false,
      showConfirmButton: false
    });
  }
  hideLoading(): void {
    Swal.close();
  }
}
