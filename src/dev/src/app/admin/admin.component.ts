/* PSG Model Ts */
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../_services';
import { Permission } from '../_models/permission';
import { User } from '../_models';

@Component({
  templateUrl: 'admin.component.html',
})
export class AdminComponent {
  token: string;
  valueName: string;
  user: User;
  permissions: Permission[];

  // Menu
  private opcion_update: boolean = false;
  private opcion_delete: boolean = false;
  private opcion_create: boolean = false;
  private opcion_read: boolean = false;
  private pregunta_update: boolean = false;
  private pregunta_delete: boolean = false;
  private pregunta_create: boolean = false;
  private pregunta_read: boolean = false;
  private examen_update: boolean = false;
  private examen_delete: boolean = false;
  private examen_create: boolean = false;
  private examen_read: boolean = false;
  private publicacion_update: boolean = false;
  private publicacion_delete: boolean = false;
  private publicacion_create: boolean = false;
  private publicacion_read: boolean = false;
  private programa_update: boolean = false;
  private programa_delete: boolean = false;
  private programa_create: boolean = false;
  private programa_read: boolean = false;
  private grupoa_update: boolean = false;
  private grupoa_delete: boolean = false;
  private grupoa_create: boolean = false;
  private grupoa_read: boolean = false;
  private recurso_update: boolean = false;
  private recurso_delete: boolean = false;
  private recurso_create: boolean = false;
  private recurso_read: boolean = false;
  private unidad_update: boolean = false;
  private unidad_delete: boolean = false;
  private unidad_create: boolean = false;
  private unidad_read: boolean = false;
  private certificacion_update: boolean = false;
  private certificacion_delete: boolean = false;
  private certificacion_create: boolean = false;
  private certificacion_read: boolean = false;
  private profesor_update: boolean = false;
  private profesor_delete: boolean = false;
  private profesor_create: boolean = false;
  private profesor_read: boolean = false;
  private estudiante_update: boolean = false;
  private estudiante_delete: boolean = false;
  private estudiante_create: boolean = false;
  private estudiante_read: boolean = false;
  private registro_update: boolean = false;
  private registro_delete: boolean = false;
  private registro_create: boolean = false;
  private registro_read: boolean = false;
  private institucion_update: boolean = false;
  private institucion_delete: boolean = false;
  private institucion_create: boolean = false;
  private institucion_read: boolean = false;
  private evento_update: boolean = false;
  private evento_delete: boolean = false;
  private evento_create: boolean = false;
  private evento_read: boolean = false;

  // Seguridad
  private users_update: boolean = false;
  private users_delete: boolean = false;
  private users_create: boolean = false;
  private users_read: boolean = false;

  private roles_update: boolean = false;
  private roles_delete: boolean = false;
  private roles_create: boolean = false;
  private roles_read: boolean = false;

  private permissions_update: boolean = false;
  private permissions_delete: boolean = false;
  private permissions_create: boolean = false;
  private permissions_read: boolean = false;

  constructor(public router: Router, public authService: AuthenticationService) {}

  ngOnInit() {
    this.getUser();
  }

  enabledLinks(user) {}

  buildMenu() {
    this.permissions.forEach(element => {
      if (element.code == 'OPCION:CREATE') {
        this.opcion_create = true;
      }

      if (element.code == 'OPCION:UPDATE') {
        this.opcion_update = true;
      }

      if (element.code == 'OPCION:DELETE') {
        this.opcion_delete = true;
      }

      if (element.code == 'OPCION:READ') {
        this.opcion_read = true;
      }

      if (element.code == 'OPCION:*') {
        this.opcion_update = true;
        this.opcion_create = true;
        this.opcion_delete = true;
        this.opcion_read = true;
      }

      if (element.code == '*:*') {
        this.opcion_update = true;
        this.opcion_create = true;
        this.opcion_delete = true;
        this.opcion_read = true;
      }

      if (element.code == 'PREGUNTA:CREATE') {
        this.pregunta_create = true;
      }

      if (element.code == 'PREGUNTA:UPDATE') {
        this.pregunta_update = true;
      }

      if (element.code == 'PREGUNTA:DELETE') {
        this.pregunta_delete = true;
      }

      if (element.code == 'PREGUNTA:READ') {
        this.pregunta_read = true;
      }

      if (element.code == 'PREGUNTA:*') {
        this.pregunta_update = true;
        this.pregunta_create = true;
        this.pregunta_delete = true;
        this.pregunta_read = true;
      }

      if (element.code == '*:*') {
        this.pregunta_update = true;
        this.pregunta_create = true;
        this.pregunta_delete = true;
        this.pregunta_read = true;
      }

      if (element.code == 'EXAMEN:CREATE') {
        this.examen_create = true;
      }

      if (element.code == 'EXAMEN:UPDATE') {
        this.examen_update = true;
      }

      if (element.code == 'EXAMEN:DELETE') {
        this.examen_delete = true;
      }

      if (element.code == 'EXAMEN:READ') {
        this.examen_read = true;
      }

      if (element.code == 'EXAMEN:*') {
        this.examen_update = true;
        this.examen_create = true;
        this.examen_delete = true;
        this.examen_read = true;
      }

      if (element.code == '*:*') {
        this.examen_update = true;
        this.examen_create = true;
        this.examen_delete = true;
        this.examen_read = true;
      }

      if (element.code == 'PUBLICACION:CREATE') {
        this.publicacion_create = true;
      }

      if (element.code == 'PUBLICACION:UPDATE') {
        this.publicacion_update = true;
      }

      if (element.code == 'PUBLICACION:DELETE') {
        this.publicacion_delete = true;
      }

      if (element.code == 'PUBLICACION:READ') {
        this.publicacion_read = true;
      }

      if (element.code == 'PUBLICACION:*') {
        this.publicacion_update = true;
        this.publicacion_create = true;
        this.publicacion_delete = true;
        this.publicacion_read = true;
      }

      if (element.code == '*:*') {
        this.publicacion_update = true;
        this.publicacion_create = true;
        this.publicacion_delete = true;
        this.publicacion_read = true;
      }

      if (element.code == 'PROGRAMA:CREATE') {
        this.programa_create = true;
      }

      if (element.code == 'PROGRAMA:UPDATE') {
        this.programa_update = true;
      }

      if (element.code == 'PROGRAMA:DELETE') {
        this.programa_delete = true;
      }

      if (element.code == 'PROGRAMA:READ') {
        this.programa_read = true;
      }

      if (element.code == 'PROGRAMA:*') {
        this.programa_update = true;
        this.programa_create = true;
        this.programa_delete = true;
        this.programa_read = true;
      }

      if (element.code == '*:*') {
        this.programa_update = true;
        this.programa_create = true;
        this.programa_delete = true;
        this.programa_read = true;
      }

      if (element.code == 'GRUPOA:CREATE') {
        this.grupoa_create = true;
      }

      if (element.code == 'GRUPOA:UPDATE') {
        this.grupoa_update = true;
      }

      if (element.code == 'GRUPOA:DELETE') {
        this.grupoa_delete = true;
      }

      if (element.code == 'GRUPOA:READ') {
        this.grupoa_read = true;
      }

      if (element.code == 'GRUPOA:*') {
        this.grupoa_update = true;
        this.grupoa_create = true;
        this.grupoa_delete = true;
        this.grupoa_read = true;
      }

      if (element.code == '*:*') {
        this.grupoa_update = true;
        this.grupoa_create = true;
        this.grupoa_delete = true;
        this.grupoa_read = true;
      }

      if (element.code == 'RECURSO:CREATE') {
        this.recurso_create = true;
      }

      if (element.code == 'RECURSO:UPDATE') {
        this.recurso_update = true;
      }

      if (element.code == 'RECURSO:DELETE') {
        this.recurso_delete = true;
      }

      if (element.code == 'RECURSO:READ') {
        this.recurso_read = true;
      }

      if (element.code == 'RECURSO:*') {
        this.recurso_update = true;
        this.recurso_create = true;
        this.recurso_delete = true;
        this.recurso_read = true;
      }

      if (element.code == '*:*') {
        this.recurso_update = true;
        this.recurso_create = true;
        this.recurso_delete = true;
        this.recurso_read = true;
      }

      if (element.code == 'UNIDAD:CREATE') {
        this.unidad_create = true;
      }

      if (element.code == 'UNIDAD:UPDATE') {
        this.unidad_update = true;
      }

      if (element.code == 'UNIDAD:DELETE') {
        this.unidad_delete = true;
      }

      if (element.code == 'UNIDAD:READ') {
        this.unidad_read = true;
      }

      if (element.code == 'UNIDAD:*') {
        this.unidad_update = true;
        this.unidad_create = true;
        this.unidad_delete = true;
        this.unidad_read = true;
      }

      if (element.code == '*:*') {
        this.unidad_update = true;
        this.unidad_create = true;
        this.unidad_delete = true;
        this.unidad_read = true;
      }

      if (element.code == 'CERTIFICACION:CREATE') {
        this.certificacion_create = true;
      }

      if (element.code == 'CERTIFICACION:UPDATE') {
        this.certificacion_update = true;
      }

      if (element.code == 'CERTIFICACION:DELETE') {
        this.certificacion_delete = true;
      }

      if (element.code == 'CERTIFICACION:READ') {
        this.certificacion_read = true;
      }

      if (element.code == 'CERTIFICACION:*') {
        this.certificacion_update = true;
        this.certificacion_create = true;
        this.certificacion_delete = true;
        this.certificacion_read = true;
      }

      if (element.code == '*:*') {
        this.certificacion_update = true;
        this.certificacion_create = true;
        this.certificacion_delete = true;
        this.certificacion_read = true;
      }

      if (element.code == 'PROFESOR:CREATE') {
        this.profesor_create = true;
      }

      if (element.code == 'PROFESOR:UPDATE') {
        this.profesor_update = true;
      }

      if (element.code == 'PROFESOR:DELETE') {
        this.profesor_delete = true;
      }

      if (element.code == 'PROFESOR:READ') {
        this.profesor_read = true;
      }

      if (element.code == 'PROFESOR:*') {
        this.profesor_update = true;
        this.profesor_create = true;
        this.profesor_delete = true;
        this.profesor_read = true;
      }

      if (element.code == '*:*') {
        this.profesor_update = true;
        this.profesor_create = true;
        this.profesor_delete = true;
        this.profesor_read = true;
      }

      if (element.code == 'ESTUDIANTE:CREATE') {
        this.estudiante_create = true;
      }

      if (element.code == 'ESTUDIANTE:UPDATE') {
        this.estudiante_update = true;
      }

      if (element.code == 'ESTUDIANTE:DELETE') {
        this.estudiante_delete = true;
      }

      if (element.code == 'ESTUDIANTE:READ') {
        this.estudiante_read = true;
      }

      if (element.code == 'ESTUDIANTE:*') {
        this.estudiante_update = true;
        this.estudiante_create = true;
        this.estudiante_delete = true;
        this.estudiante_read = true;
      }

      if (element.code == '*:*') {
        this.estudiante_update = true;
        this.estudiante_create = true;
        this.estudiante_delete = true;
        this.estudiante_read = true;
      }

      if (element.code == 'REGISTRO:CREATE') {
        this.registro_create = true;
      }

      if (element.code == 'REGISTRO:UPDATE') {
        this.registro_update = true;
      }

      if (element.code == 'REGISTRO:DELETE') {
        this.registro_delete = true;
      }

      if (element.code == 'REGISTRO:READ') {
        this.registro_read = true;
      }

      if (element.code == 'REGISTRO:*') {
        this.registro_update = true;
        this.registro_create = true;
        this.registro_delete = true;
        this.registro_read = true;
      }

      if (element.code == '*:*') {
        this.registro_update = true;
        this.registro_create = true;
        this.registro_delete = true;
        this.registro_read = true;
      }

      if (element.code == 'INSTITUCION:CREATE') {
        this.institucion_create = true;
      }

      if (element.code == 'INSTITUCION:UPDATE') {
        this.institucion_update = true;
      }

      if (element.code == 'INSTITUCION:DELETE') {
        this.institucion_delete = true;
      }

      if (element.code == 'INSTITUCION:READ') {
        this.institucion_read = true;
      }

      if (element.code == 'INSTITUCION:*') {
        this.institucion_update = true;
        this.institucion_create = true;
        this.institucion_delete = true;
        this.institucion_read = true;
      }

      if (element.code == '*:*') {
        this.institucion_update = true;
        this.institucion_create = true;
        this.institucion_delete = true;
        this.institucion_read = true;
      }

      if (element.code == 'EVENTO:CREATE') {
        this.evento_create = true;
      }

      if (element.code == 'EVENTO:UPDATE') {
        this.evento_update = true;
      }

      if (element.code == 'EVENTO:DELETE') {
        this.evento_delete = true;
      }

      if (element.code == 'EVENTO:READ') {
        this.evento_read = true;
      }

      if (element.code == 'EVENTO:*') {
        this.evento_update = true;
        this.evento_create = true;
        this.evento_delete = true;
        this.evento_read = true;
      }

      if (element.code == '*:*') {
        this.evento_update = true;
        this.evento_create = true;
        this.evento_delete = true;
        this.evento_read = true;
      }

      // Seguridad
      if (element.code == 'USERS:CREATE') {
        this.users_create = true;
      }

      if (element.code == 'USERS:UPDATE') {
        this.users_update = true;
      }

      if (element.code == 'USERS:DELETE') {
        this.users_delete = true;
      }

      if (element.code == 'USERS:READ') {
        this.users_read = true;
      }

      if (element.code == 'USERS:*') {
        this.users_update = true;
        this.users_create = true;
        this.users_delete = true;
        this.users_read = true;
      }

      if (element.code == '*:*') {
        this.users_update = true;
        this.users_create = true;
        this.users_delete = true;
        this.users_read = true;
      }

      if (element.code == 'ROLES:CREATE') {
        this.roles_create = true;
      }

      if (element.code == 'ROLES:UPDATE') {
        this.roles_update = true;
      }

      if (element.code == 'ROLES:DELETE') {
        this.roles_delete = true;
      }

      if (element.code == 'ROLES:READ') {
        this.roles_read = true;
      }

      if (element.code == 'ROLES:*') {
        this.roles_update = true;
        this.roles_create = true;
        this.roles_delete = true;
        this.roles_read = true;
      }

      if (element.code == '*:*') {
        this.roles_update = true;
        this.roles_create = true;
        this.roles_delete = true;
        this.roles_read = true;
      }

      if (element.code == 'PERMISSIONS:CREATE') {
        this.permissions_create = true;
      }

      if (element.code == 'PERMISSIONS:UPDATE') {
        this.permissions_update = true;
      }

      if (element.code == 'PERMISSIONS:DELETE') {
        this.permissions_delete = true;
      }

      if (element.code == 'PERMISSIONS:READ') {
        this.permissions_read = true;
      }

      if (element.code == 'PERMISSIONS:*') {
        this.permissions_update = true;
        this.permissions_create = true;
        this.permissions_delete = true;
        this.permissions_read = true;
      }

      if (element.code == '*:*') {
        this.permissions_update = true;
        this.permissions_create = true;
        this.permissions_delete = true;
        this.permissions_read = true;
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
      this.valueName = this.user.display_name;

      this.buildMenu();
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
