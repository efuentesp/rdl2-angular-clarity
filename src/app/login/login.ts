import { Component, OnInit, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
// import { AuthenticationService, AlertService } from "../_services";
import Swal from "sweetalert2";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";
import { Usuario } from "../models/usuario";

@Component({ selector: "login", templateUrl: "login.html" })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  titulo: string = "Por favor Sign In!";
  usuario: Usuario;
  token: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    console.log("LoginComponent");

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    if (this.authService.isAuthenticated()) {
      // Swal(
      //   "Login",
      //   `Hola ${this.authService.usuario.username} ya estás autenticado!`,
      //   "info"
      // );
      console.log("Usuario ya estás autenticado!");
      this.router.navigate(["/admin"]);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    console.log(this.usuario);
    if (this.f.email == null || this.f.password == null) {
      console.log("Username o password vacías!");
      return;
    } else {
      this.usuario.email = this.f.email.value;
      this.usuario.password = this.f.password.value;
    }

    this.authService.login(this.usuario).subscribe(
      (response) => {
        this.token = response.access_token;
        // this.authService.guardaProfile(response.access_token);
        // this.authService.guardarUsuario(response.access_token);
        // this.authService.guardarToken(response.access_token);
        // let usuario = this.authService.usuario;
        // this.router.navigate(["/clientes"]);
        // swal(
        //   "Login",
        //   `Hola ${usuario.username}, has iniciado sesión con éxito!`,
        //   "success"
        // );
        console.log("has iniciado sesión con éxito!");
        this.authService.getProfile(this.token).subscribe(
          (response) => {
            //this.token = response.access_token;
            this.authService.guardarUsuario(response, this.token);
            // this.authService.guardarUsuario(response.access_token);
            // this.authService.guardarToken(this.token);
            // this.authService.guardarPermisos(response.permissions);
            //let usuario = this.authService.usuario;
            this.router.navigate(["/admin"]);
            // swal(
            //   "Login",
            //   `Hola ${usuario.username}, has iniciado sesión con éxito!`,
            //   "success"
            // );
            console.log("has iniciado sesión con éxito!");
          },
          (err) => {
            if (err.status == 400) {
              // swal("Error Login", "Usuario o clave incorrectas!", "error");
              console.log("Usuario o clave incorrectas!");
            }
          }
        );
      },
      (err) => {
        if (err.status == 400) {
          console.log("Usuario o clave incorrectas!");
          // swal("Error Login", "Usuario o clave incorrectas!", "error");
        }
      }
    );
  }

  // loginForm: FormGroup;
  // loading = false;
  // submitted = false;
  // returnUrl: string;

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private authenticationService: AuthenticationService,
  //   private alertService: AlertService
  // ) {}

  // ngOnInit() {
  //   console.log("OnInit() LoginComponent");
  //   this.loginForm = this.formBuilder.group({
  //     email: ["", Validators.required],
  //     password: ["", Validators.required]
  //   });

  //   this.authenticationService.logout();
  //   this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  // }

  // get f() {
  //   return this.loginForm.controls;
  // }

  // onSubmit() {
  //   console.log("onSubmit() LoginComponent");
  //   this.submitted = true;

  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;

  //   this.authenticationService
  //     .login(this.f.email.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         console.log('this.router.navigate(["admin"])', data);
  //         this.router.navigate(["admin"]);
  //       },
  //       error => {
  //         this.loading = false;
  //         this.submitted = false;
  //         console.log(error);
  //         if (error === "Unknown Error") {
  //           Swal.fire(
  //             "Error en la conexión con el Servidor",
  //             `Verifique que el servidor ${
  //               environment.apiUrl
  //             } este respondiendo.`,
  //             "error"
  //           );
  //         } else {
  //           Swal.fire("Error", error, "error");
  //         }
  //         //this.alertService.error(error);
  //       }
  //     );

  //   //this.loading = false;
  // }
}
