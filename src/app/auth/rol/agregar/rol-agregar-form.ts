import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

import Swal from "sweetalert2";
import { ValidationService } from "../../../_validation/validation.service";

import { RolSend } from "../rol.psg.model-send";
import { RolService } from "../rol.psg.service";

@Component({
  selector: "clr-alert-not-closable-demo-angular",
  styleUrls: ["../rol.psg.scss"],
  templateUrl: "./rol-agregar.psg.html"
})
export class RoleAgregarFormDemo implements OnInit {
  rolForm: FormGroup;
  submitted = false;
  public rolSend: RolSend = new RolSend();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
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
    //this.cargaRoles();
  }

  guardaUser() {
    this.submitted = true;

    if (this.rolForm.invalid) {
      return;
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
}
