import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Solicitudpension } from '../solicitudpension.demo.model';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-administrar.demo.html',
})
export class SolicitudpensionAdministrarDemo {
  solicitudpensionsArray: Solicitudpension[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private solicitudpension_update: boolean = false;
  private solicitudpension_delete: boolean = false;
  private solicitudpension_create: boolean = false;
  private solicitudpension_read: boolean = false;

  constructor(
    private solicitudpensionService: SolicitudpensionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargaSolicitudpensions();
  }

  cargaSolicitudpensions() {
    this.solicitudpensionService.getRecuperaSolicitudpensions().subscribe(
      res => {
        if (res) {
          this.solicitudpensionsArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the solicitudpensions.', 'error');
      }
    );
  }

  setClickedRowEditaSolicitudpension(index, solicitudpension) {
    console.log('Edita Solicitudpension:', solicitudpension);
    this.solicitudpensionService.setSolicitudpension(solicitudpension);
    this.router.navigate(['../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaSolicitudpension(index, solicitudpension) {
    console.log('Elimina Solicitudpension:', solicitudpension);
    this.solicitudpensionService.setSolicitudpension(solicitudpension);
    this.router.navigate(['../eliminar'], { relativeTo: this.route });
  }

  getSolicitudpension() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
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
}
