/* PSG  User Agregar Ts */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import Swal from "sweetalert2";
import { Location, DatePipe } from "@angular/common";

import { RolSend } from "../rol.psg.model-send";
import { RolService } from "../rol.psg.service";
import { Enabled } from "../rol.psg.model.enabled";
import { element } from "protractor";

@Component({
  selector: "clr-alert-not-closable-demo-angular",
  styleUrls: ["../rol.psg.scss"],
  templateUrl: "./rol-agregar.psg.html"
})
export class RoleAgregarFormDemo implements OnInit {
  rolForm: FormGroup;
  submitted = false;
  public rolSend: RolSend = new RolSend();
  enabledArray: Enabled[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,
    private location: Location
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
  }

  guardaRol() {
    this.submitted = true;

    if (this.rolForm.invalid) {
      Object.keys(this.rolForm.controls).forEach(field => {
        const control = this.rolForm.get(field);
        if (control.valid == false) {
          control.markAsTouched({ onlySelf: true });
          Swal.fire(
            "Error...",
            "Rol has fields to fill - (" + field + ")",
            "error"
          );
        }
      });
    } else {
      this.rolSend.name = this.rolForm.controls["name"].value;
      this.rolSend.description = this.rolForm.controls["description"].value;
      this.rolSend.enabled = this.rolForm.controls["enabled"].value;

      this.rolService.postGuardaRol(this.rolSend).subscribe(res => {
        if (res) {
          Swal.fire("Success...", "Rol save successfully.", "success");
          this.router.navigate(["../administrar"], { relativeTo: this.route });
        } else {
          Swal.fire("Error...", "Rol save unsuccessfully.", "error");
        }
      });
    }
  }

  regresaRol() {
    this.location.back();
  }
}
