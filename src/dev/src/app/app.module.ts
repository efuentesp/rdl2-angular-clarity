import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { AppContentContainerComponent } from './content-container.component';
import { HomeComponent } from './home.component';
import { ControlMessagesComponent } from './_validation/control-messages.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AppContentContainerComponent, ControlMessagesComponent],
  imports: [BrowserAnimationsModule, CommonModule, ClarityModule, ROUTING],
  bootstrap: [AppComponent],
})
export class AppModule {}
