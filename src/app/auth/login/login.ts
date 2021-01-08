import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ClrForm } from "@clr/angular";
import Swal from "sweetalert2";
import { AuthService } from "src/app/services/auth.service";
import { Usuario } from "src/app/models/usuario";

@Component({
  selector: "login",
  templateUrl: "login.html",
  styleUrls: ["../../app.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild(ClrForm, { static: true }) clrForm;

  loading = false;
  submitted = false;
  returnUrl: string;

  title: string = "PSG - Softtek";
  usuario: Usuario;
  token: string = "";
  year = new Date().getFullYear();

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit() {
    console.log("LoginComponent");

    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/admin"]);
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      Swal.fire("Error...", "¡Username o password vacías!!", "error");
      return;
    } else {
      this.usuario.email = this.loginForm.controls.email.value;
      this.usuario.password = this.loginForm.controls.password.value;
    }

    this.authService.login(this.usuario).subscribe(
      (response) => {
        this.token = response.access_token;
        this.authService.getProfile(this.token).subscribe(
          (response) => {
            this.loginForm.controls.email == null;
            this.loginForm.controls.password == null;
            this.authService.guardarUsuario(response, this.token);
            this.router.navigate(["/admin"]);
          },
          (err) => {
            if (err.status == 400) {
              Swal.fire("Error...", "¡Usuario o claves incorrectas!", "error");
            }
          }
        );
      },
      (err) => {
        if (err.status == 401) {
          Swal.fire("Error...", "¡Usuario o claves incorrectas!", "error");
        } else {
          Swal.fire("Error...", "¡El servidor no responde!", "error");
        }
      }
    );
  }
}
