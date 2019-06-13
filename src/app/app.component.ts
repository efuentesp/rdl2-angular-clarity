import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent implements OnInit {
  public routes: Route[] = APP_ROUTES;

  ngOnInit() {
    console.log('OnInit() AppComponent');
  }
}
