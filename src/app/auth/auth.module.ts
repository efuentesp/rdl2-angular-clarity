import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register/register.component";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./login/login";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
})
export class AuthModule {}
