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
            <nav class="sidenav" [clr-nav-level]="2">
                <section class="sidenav-content">
                    <section class="nav-group">
                        <input id="tab1" type="checkbox">
                        <label for="tab1"> <clr-icon shape="home"></clr-icon>  Navigation</label>
                    </section>
                    <div class="card-header"></div>
                    <section class="nav-group collapsible">
                        <input id="tab2" type="checkbox">
                        <label for="tab2"> <clr-icon shape="list"></clr-icon>  Pensiones</label>
                        <ul class="nav-list">
                            <li *ngFor="let route of routes">
                                <a *ngIf="route.path != ''" class="nav-link" [routerLink]="[route.path]"
                                [routerLinkActive]="['active']"><clr-icon shape="application"></clr-icon> {{route.path}}</a>
                            </li>
                        </ul>
                    </section>
                    <div class="card-header"></div>
                    <section class="nav-group collapsible">
                        <input id="tab3" type="checkbox">
                        <label for="tab3"> <clr-icon shape="list"></clr-icon>  Demo</label>
                    </section>
                </section>
            </nav>

            <!--DO NOT DELETE THE COMMENTS BELOW. Needed for testing the Vertical Nav-->
            <!--clr-vertical-nav [clrVerticalNavCollapsible]="true" [clrVerticalNavCollapsed]="false" [clr-nav-level]="2">
                <clr-vertical-nav-group>
                    <clr-icon shape="home" clrVerticalNavIcon></clr-icon>
                    Home
                    <ng-container *ngFor="let route of routes" ngProjectAs="[clrVerticalNavLink]">
                        <a clrVerticalNavLink *ngIf="route.path != ''"
                           [routerLink]="[route.path]"
                           [routerLinkActive]="['active']">
                            {{route.path}}
                        </a>
                    </ng-container>
                </clr-vertical-nav-group>
            </clr-vertical-nav-->
    
            <!--clr-vertical-nav [clrVerticalNavCollapsible]="true" [clrVerticalNavCollapsed]="false" [clr-nav-level]="2">
                <ng-container *ngFor="let route of routes">
                    <a clrVerticalNavLink *ngIf="route.path != ''"
                       [routerLink]="[route.path]"
                       [routerLinkActive]="['active']">
                        {{route.path}}
                    </a>
                </ng-container>
            </clr-vertical-nav-->
        `,
})
export class AppContentContainerComponent {
  public routes: Route[] = APP_ROUTES;
}