/* PSG  Rol Administrar Ts */
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Usuario } from "../../../models/usuario";
import { RolService } from "../rol.psg.service";
import { Rol } from "../rol.psg.model";

@Component({
  selector: "clr-rol-demo-styles",
  styleUrls: ["../rol.psg.scss"],
  templateUrl: "./rol-administrar.psg.html",
})
export class RolAdministrarDemo {
  // Permisos
  loading = false;
  rolArray: Rol[];

  // Seguridad
  token: string;
  user: Usuario;
  permissions: any[];

  // Botones
  roles_update: boolean = false;
  roles_delete: boolean = false;
  roles_create: boolean = false;
  roles_read: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaRoles();
  }

  cargaRoles() {
    this.rolService.getRecuperaRol().subscribe(
      (res) => {
        if (res) {
          console.log("Roles:", res);
          this.rolArray = res;
        }
      },
      (error) => {
        //Swal.fire('Error...', 'An error occurred while calling the direccions.', 'error');
      }
    );
  }

  setClickedRowEditaRol(index, rol) {
    this.rolService.setRol(rol);
    this.router.navigate(["../editar", rol.id], { relativeTo: this.route });
  }

  setClickedRowEliminaRol(index, rol) {
    this.rolService.setRol(rol);
    this.router.navigate(["../eliminar", rol.id], { relativeTo: this.route });
  }

  getRol() {
    this.router.navigate(["../agregar"], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    this.permissions = obj["permissions"];
    this.user = obj["user"];
  }

  setButtons() {
    this.permissions.forEach((element) => {
      if (element.code == "*:*") {
        this.roles_update = true;
        this.roles_delete = true;
        this.roles_create = true;
        this.roles_read = true;
      }
      if (element.code == "ROLES:UPDATE") {
        this.roles_update = true;
      }
      if (element.code == "ROLES:DELETE") {
        this.roles_delete = true;
      }
      if (element.code == "ROLES:READ") {
        this.roles_read = true;
      }
      if (element.code == "ROLES:CREATE") {
        this.roles_create = true;
      }
      if (element.code == "ROLES:*") {
        this.roles_update = true;
        this.roles_delete = true;
        this.roles_create = true;
        this.roles_read = true;
      }
    });
  }
}
