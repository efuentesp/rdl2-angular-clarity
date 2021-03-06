/* PSG  User Administrar Ts */
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
// import { Permission } from "../../../_models/permission";
import { Usuario } from "../../../models/usuario";
import { UserService } from "../user.psg.service";
import { User } from "../user.psg.model";

@Component({
  selector: "clr-user-demo-styles",
  styleUrls: ["../user.psg.scss"],
  templateUrl: "./user-administrar.psg.html",
})
export class UserAdministrarDemo {
  // Permisos
  loading = false;

  // Permisos
  public userArray: User;

  // Seguridad
  token: string;
  user: Usuario;
  permissions: any[];

  users_update: boolean = false;
  users_delete: boolean = false;
  users_create: boolean = false;
  users_read: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.setButtons();
    this.cargaUser();
  }

  cargaUser() {
    this.userService.getRecuperaUser().subscribe(
      (res) => {
        if (res) {
          this.userArray = res;
        }
      },
      (error) => {
        Swal.fire(
          "Error...",
          "An error occurred while calling the user.",
          "error"
        );
      }
    );
  }

  setClickedRowEditaUser(index, user) {
    this.userService.setUser(user);
    this.router.navigate(["../editar", user.id], { relativeTo: this.route });
  }

  setClickedRowEliminaUser(index, user) {
    this.userService.setUser(user);
    this.router.navigate(["../eliminar", user.id], { relativeTo: this.route });
  }

  getUser() {
    this.router.navigate(["../agregar"], { relativeTo: this.route });
  }

  getUsers() {
    var obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    this.permissions = obj["permissions"];
    this.user = obj["user"];
  }

  setButtons() {
    this.permissions.forEach((element) => {
      if (element.code == "*:*") {
        this.users_update = true;
        this.users_delete = true;
        this.users_create = true;
        this.users_read = true;
      }
      if (element.code == "USERS:UPDATE") {
        this.users_update = true;
      }
      if (element.code == "USERS:DELETE") {
        this.users_delete = true;
      }
      if (element.code == "USERS:READ") {
        this.users_read = true;
      }
      if (element.code == "USERS:CREATE") {
        this.users_create = true;
      }
      if (element.code == "USERS:*") {
        this.users_update = true;
        this.users_delete = true;
        this.users_create = true;
        this.users_read = true;
      }
    });
  }
}
