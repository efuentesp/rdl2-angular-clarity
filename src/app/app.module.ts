import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";

import localeES from "@angular/common/locales/es";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { NopagefoundComponent } from "./nonpagefound/nopagefound.component";
import { PagesModule } from "./pages/pages.module";
import { AuthModule } from "./auth/auth.module";
// import { HeaderComponent } from "./header/header.component";
// import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [AppComponent, NopagefoundComponent],

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
    PagesModule,
    AuthModule,
  ],
  providers: [
    [
      { provide: LOCALE_ID, useValue: "es-MX" },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
