/* PSG  Afiliado Administrar Ts */
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
// import { Permission } from "../../../_models/permission";
// import { User } from "../../../_models";

import { PermissionService } from "../permission.psg.service";

@Component({
  selector: "clr-permission-demo-styles",
  templateUrl: "./permission-administrar.psg.html",
})
export class PermissionAdministrarDemo {
  // Permisos
  token: string;
  // user: User;
  // permissionArray: Permission[];
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.setButtons();
    this.cargaPermission();
  }

  cargaPermission() {
    this.permissionService.getAllPermission().subscribe(
      (res) => {
        if (res) {
          // this.permissionArray = res;
        }
      },
      (error) => {
        Swal.fire(
          "Error...",
          "An error occurred while calling the afiliado.",
          "error"
        );
      }
    );
  }

  setButtons() {}
}
