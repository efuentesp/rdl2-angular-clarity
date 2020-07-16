import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { AppComponent } from "./app.component";
// import { AuthGuard } from "./_guards";
// import { AlertService, AuthenticationService, UserService } from "./_services";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
// import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./login/login";

import localeES from "@angular/common/locales/es";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
// import { HeaderComponent } from "./header/header.component";
// import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [AppComponent, LoginComponent],

  imports: [
    // HeaderComponent,
    // FooterComponent,
    BrowserAnimationsModule,
    CommonModule,
    ClarityModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [
    // AuthGuard,
    // AlertService,
    // AuthenticationService,
    // UserService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [
      { provide: LOCALE_ID, useValue: "es" },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
