import { Component } from '@angular/core';
import { Route } from '@angular/router';

import { APP_ROUTES } from './app.routing';

@Component({
  selector: 'app-content-container',
  template: `
           
                <router-outlet></router-outlet>
              
        `,
})
export class AppContentContainerComponent {
  //public routes: Route[] = APP_ROUTES;
}
