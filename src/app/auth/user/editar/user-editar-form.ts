/* PSG  User Edita Ts */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Location, DatePipe } from "@angular/common";
import Swal from "sweetalert2";

import { User } from "../user.psg.model";
import { UserSend } from "../user.psg.model-send";
import { UserService } from "../user.psg.service";
import { Rol } from "../../rol/rol.psg.model";
import { RolService } from "../../rol/rol.psg.service";

// import { RolService } from '../../rol/rol.psg.service';
// import { Rol } from '../../rol/rol.psg.model';

@Component({
  selector: "clr-user-not-closable-psg-angular",
  styleUrls: ["../user.psg.scss"],
  templateUrl: "./user-editar.psg.html"
})
export class UserEditarFormDemo implements OnInit {
  public userForm: FormGroup;
  public submitted = false;
  public user: User = new User();
  public userSend: UserSend = new UserSend();
  public idUser: string;
  public datePipe = new DatePipe("en-US");
  public rolesArray: Rol[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private rolService: RolService,
    private location: Location
  ) {
    this.userForm = this.fb.group({
      username: new FormControl("", Validators.required),
      display_name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      enabled: new FormControl("", Validators.required),
      rol: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.recuperaUser();
    this.cargaRoles();
  }

  recuperaUser() {
    this.user = this.userService.getUser();
    this.userForm.controls["username"].setValue(this.user.username);
    this.userForm.controls["display_name"].setValue(this.user.display_name);
    this.userForm.controls["email"].setValue(this.user.email);
    this.userForm.controls["enabled"].setValue(this.user.enabled);
    this.userForm.controls["password"].setValue(this.user.password);
    this.userForm.controls["rol"].setValue(this.user.roleId);
  }

  editaUser() {
    this.submitted = true;

    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(field => {
        const control = this.userForm.get(field);
        if (control.valid == false) {
          control.markAsTouched({ onlySelf: true });
          Swal.fire(
            "Error...",
            "User has fields to fill - (" + field + ")",
            "error"
          );
        }
      });
    } else {
      this.route.params.subscribe(params => {
        this.idUser = params["id"];
      });

      this.userSend.username = this.userForm.controls["username"].value;
      this.userSend.display_name = this.userForm.controls["display_name"].value;
      this.userSend.email = this.userForm.controls["email"].value;
      this.userSend.enabled = this.userForm.controls["enabled"].value;
      this.userSend.password = this.userForm.controls["password"].value;
      this.userSend.roleId = this.userForm.controls["rol"].value;

      this.userService.updateEditaUser(this.userSend, this.idUser).subscribe(
        res => {
          if (res) {
            Swal.fire("Success...", "User save successfully.", "success");
            this.location.back();
          }
        },
        error => {
          let errorMessage = "";
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
          }

          Swal.fire(
            "Error...",
            "User save unsuccessfully." + errorMessage,
            "error"
          );
        }
      );
    }
  }

  cargaRoles() {
    this.rolService.getRecuperaRol().subscribe(
      res => {
        if (res) {
          this.rolesArray = res;
        }
      },
      error => {
        Swal.fire(
          "Error...",
          "An error occurred while calling the direccions.",
          "error"
        );
      }
    );
  }

  regresaUser() {
    this.router.navigate(["../../administrar"], { relativeTo: this.route });
  }
}
