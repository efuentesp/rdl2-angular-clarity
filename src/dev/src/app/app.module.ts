import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { AppContentContainerComponent } from './content-container.component';
import { ControlMessagesComponent } from './_validation/control-messages.component';
import { RegisterComponent } from './register';
import { LoginComponent } from './login/login.demo';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertsDemo } from './alert/alert.demo';

@NgModule({
  declarations: [
    AppComponent,
    AppContentContainerComponent,
    ControlMessagesComponent,
    RegisterComponent,
    LoginComponent,
    AlertsDemo,
  ],
  imports: [BrowserAnimationsModule, CommonModule, ClarityModule, ROUTING, ReactiveFormsModule, HttpClientModule],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
