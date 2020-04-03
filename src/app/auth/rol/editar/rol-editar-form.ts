/* PSG  User Edita Ts */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import Swal from "sweetalert2";

import { RolService } from "../rol.psg.service";
import { Rol } from "../rol.psg.model";
import { RolSend } from "../rol.psg.model-send";
import { Enabled } from "../rol.psg.model.enabled";

@Component({
  selector: "clr-rol-not-closable-psg-angular",
  styleUrls: ["../rol.psg.scss"],
  templateUrl: "./rol-editar.psg.html"
})
export class RolEditarFormDemo implements OnInit {
  public rolForm: FormGroup;
  public submitted = false;
  public idRol: string;
  public rolesArray: Rol[];
  public rolSend: RolSend = new RolSend();
  public rol: Rol;
  enabledArray: Enabled[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService
  ) {
    this.rolForm = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      enabled: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    let elementA = new Enabled();
    let elementB = new Enabled();

    elementA.name = "true";
    elementA.description = "Activo";

    elementB.name = "false";
    elementB.description = "Inactivo";

    this.enabledArray.push(elementA);
    this.enabledArray.push(elementB);
    this.recuperaUser();
  }

  recuperaUser() {
    this.rol = this.rolService.getRol();
    this.rolForm.controls["name"].setValue(this.rol.name);
    this.rolForm.controls["description"].setValue(this.rol.description);
    this.rolForm.controls["enabled"].setValue(this.rol.enabled);
  }

  editaRol() {
    this.submitted = true;

    if (this.rolForm.invalid) {
      Object.keys(this.rolForm.controls).forEach(field => {
        const control = this.rolForm.get(field);
        if (control.valid == false) {
          control.markAsTouched({ onlySelf: true });
          Swal.fire(
            "Error...",
            "Instrucción de venta de valores has fields to fill - (" +
              field +
              ")",
            "error"
          );
        }
      });
    } else {
      this.route.params.subscribe(params => {
        this.idRol = params["id"];
      });

      this.rolSend.name = this.rolForm.controls["name"].value;
      this.rolSend.description = this.rolForm.controls["description"].value;

      if (this.rolForm.controls["enabled"].value === "true") {
        this.rolSend.enabled = true;
      } else {
        this.rolSend.enabled = false;
      }

      this.rolService
        .updateEditaRol(this.rolSend, this.idRol)
        .subscribe(res => {
          if (res) {
            Swal.fire("Success...", "User save successfully.", "success");
            this.router.navigate(["../../administrar"], {
              relativeTo: this.route
            });
          } else {
            Swal.fire("Error...", "User save unsuccessfully.", "error");
          }
        });
    }
  }

  regresaRol() {
    this.router.navigate(["../../administrar"], { relativeTo: this.route });
  }
}
