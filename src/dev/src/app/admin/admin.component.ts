import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../_services';
import { Permission } from '../_models/permission';
import { User } from '../_models';

@Component({
  templateUrl: 'admin.components.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  token: string;
  valueName: string;
  user: User;
  permissions: Permission[];

  // Menu
  private user_create: boolean = false;
  private user_update: boolean = false;
  private user_delete: boolean = false;
  private user_read: boolean = false;

  private location_update: boolean = false;
  private location_delete: boolean = false;
  private location_create: boolean = false;
  private location_read: boolean = false;

  private afiliado_update: boolean = false;
  private afiliado_delete: boolean = false;
  private afiliado_create: boolean = false;
  private afiliado_read: boolean = false;

  private beneficiario_update: boolean = false;
  private beneficiario_delete: boolean = false;
  private beneficiario_create: boolean = false;
  private beneficiario_read: boolean = false;

  constructor(public router: Router, public authService: AuthenticationService) {}

  ngOnInit() {
    this.getUser();
  }

  enabledLinks(user) {}

  buildMenu() {
    this.permissions.forEach(element => {
      if (element.code == 'USER:CREATE') {
        this.user_create = true;
      }

      if (element.code == 'USER:UPDATE') {
        this.user_update = true;
      }

      if (element.code == 'USER:DELETE') {
        this.user_delete = true;
      }

      if (element.code == 'USER:READ') {
        this.user_read = true;
      }

      if (element.code == 'USER:*') {
        this.user_update = true;
        this.user_delete = true;
        this.user_delete = true;
        this.user_read = true;
      }

      if (element.code == 'AFILIADO:CREATE') {
        this.afiliado_create = true;
      }

      if (element.code == 'AFILIADO:UPDATE') {
        this.afiliado_update = true;
      }

      if (element.code == 'AFILIADO:DELETE') {
        this.afiliado_delete = true;
      }

      if (element.code == 'AFILIADO:READ') {
        this.afiliado_read = true;
      }

      if (element.code == 'AFILIADO:*') {
        this.afiliado_update = true;
        this.afiliado_create = true;
        this.afiliado_delete = true;
        this.afiliado_read = true;
      }

      if (element.code == 'BENEFICIARIO:CREATE') {
        this.beneficiario_create = true;
      }

      if (element.code == 'BENEFICIARIO:UPDATE') {
        this.beneficiario_update = true;
      }

      if (element.code == 'BENEFICIARIO:DELETE') {
        this.beneficiario_delete = true;
      }

      if (element.code == 'BENEFICIARIO:READ') {
        this.beneficiario_read = true;
      }

      if (element.code == 'BENEFICIARIO:*') {
        this.beneficiario_update = true;
        this.beneficiario_create = true;
        this.beneficiario_delete = true;
        this.beneficiario_read = true;
      }

      if (element.code == 'LOCATIONS:CREATE') {
        this.location_create = true;
      }

      if (element.code == 'LOCATIONS:UPDATE') {
        this.location_update = true;
      }

      if (element.code == 'LOCATIONS:DELETE') {
        this.location_delete = true;
      }

      if (element.code == 'LOCATIONS:READ') {
        this.location_read = true;
      }

      if (element.code == 'LOCATIONS:*') {
        this.location_update = true;
        this.location_delete = true;
        this.location_create = true;
        this.location_read = true;
      }
    });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];

    this.authService.getUser(this.token).subscribe(result => {
      var obj = JSON.parse(localStorage.getItem('currentUser'));

      this.user = obj['user'];
      this.permissions = obj['permissions'];
      this.token = obj['token'];

      // console.log('La respuesta:', this.user);
      // console.log('La respuesta:', this.permissions);
      // console.log('La respuesta:', this.token);

      this.valueName = this.user.display_name;

      this.buildMenu();
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    // this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
