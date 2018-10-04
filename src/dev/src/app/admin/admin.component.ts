import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routing';

@Component({ selector: 'app-root', templateUrl: './admin.component.html' })
export class AdminComponent {
  public routes: Route[] = ADMIN_ROUTES;
}
