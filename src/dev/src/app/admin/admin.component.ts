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
  private afiliado_update: boolean = false;
  private afiliado_delete: boolean = false;
  private afiliado_create: boolean = false;
  private afiliado_read: boolean = false;

  private beneficiario_update: boolean = false;
  private beneficiario_delete: boolean = false;
  private beneficiario_create: boolean = false;
  private beneficiario_read: boolean = false;

  private tipopension_update: boolean = false;
  private tipopension_delete: boolean = false;
  private tipopension_create: boolean = false;
  private tipopension_read: boolean = false;

  private solicitudpension_update: boolean = false;
  private solicitudpension_delete: boolean = false;
  private solicitudpension_create: boolean = false;
  private solicitudpension_read: boolean = false;

  constructor(public router: Router, public authService: AuthenticationService) {}

  ngOnInit() {
    this.getUser();
  }

  enabledLinks(user) {}

  buildMenu() {
    this.permissions.forEach(element => {
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

      if (element.code == 'TIPOPENSION:CREATE') {
        this.tipopension_create = true;
      }

      if (element.code == 'TIPOPENSION:UPDATE') {
        this.tipopension_update = true;
      }

      if (element.code == 'TIPOPENSION:DELETE') {
        this.tipopension_delete = true;
      }

      if (element.code == 'TIPOPENSION:READ') {
        this.tipopension_read = true;
      }

      if (element.code == 'TIPOPENSION:*') {
        this.tipopension_update = true;
        this.tipopension_create = true;
        this.tipopension_delete = true;
        this.tipopension_read = true;
      }

      if (element.code == 'SOLICITUDPENSION:CREATE') {
        this.solicitudpension_create = true;
      }

      if (element.code == 'SOLICITUDPENSION:UPDATE') {
        this.solicitudpension_update = true;
      }

      if (element.code == 'SOLICITUDPENSION:DELETE') {
        this.solicitudpension_delete = true;
      }

      if (element.code == 'SOLICITUDPENSION:READ') {
        this.solicitudpension_read = true;
      }

      if (element.code == 'SOLICITUDPENSION:*') {
        this.solicitudpension_update = true;
        this.solicitudpension_create = true;
        this.solicitudpension_delete = true;
        this.solicitudpension_read = true;
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
