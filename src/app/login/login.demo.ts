import { Component, OnInit, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthenticationService, AlertService } from "../_services";
import Swal from "sweetalert2";
import { environment } from "../../environments/environment";

@Component({ selector: "clr-login-demo", templateUrl: "login.demo.html" })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    console.log("OnInit() LoginComponent");
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log("onSubmit() LoginComponent");
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('this.router.navigate(["admin"])', data);
          this.router.navigate(["admin"]);
        },
        error => {
          this.loading = false;
          this.submitted = false;
          console.log(error);
          if (error === "Unknown Error") {
            Swal.fire(
              "Error en la conexión con el Servidor",
              `Verifique que el servidor ${
                environment.apiUrl
              } este respondiendo.`,
              "error"
            );
          } else {
            Swal.fire("Error", error, "error");
          }
          //this.alertService.error(error);
        }
      );

    //this.loading = false;
  }
}