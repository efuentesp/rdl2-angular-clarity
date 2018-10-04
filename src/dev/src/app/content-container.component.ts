import { Component } from '@angular/core';
import { Route } from '@angular/router';

import { APP_ROUTES } from './app.routing';

@Component({
  selector: 'app-content-container',
  template: `
            <main class="content-area">
                <div class="card">
                <router-outlet></router-outlet>
                </div>
            </main>
        `,
})
export class AppContentContainerComponent {
  public routes: Route[] = APP_ROUTES;
}
