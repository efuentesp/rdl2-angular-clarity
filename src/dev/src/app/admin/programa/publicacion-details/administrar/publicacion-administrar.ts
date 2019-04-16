import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Programa } from '../../programa.psg.model';
import { ProgramaService } from '../../programa.psg.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../../_models/permission';
import { User } from '../../../../_models';

import { PublicacionService } from '../../../publicacion/publicacion.psg.service';
import { Publicacion } from '../../../publicacion/publicacion.psg.model';

@Component({
  selector: 'clr-publicacion-styles',
  styleUrls: ['../../programa.psg.scss'],
  templateUrl: './publicacion-administrar.psg.html',
})
export class PublicacionDetailsFormDemo {
  publicacionArray: Publicacion[];
  programa = new Programa();

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private publicacion_update: boolean = false;
  private publicacion_delete: boolean = false;
  private publicacion_create: boolean = false;
  private publicacion_read: boolean = false;

  public variableEntidad: string = '';
  public idPrograma: string = '';

  constructor(
    private publicacionService: PublicacionService,
    private router: Router,
    private route: ActivatedRoute,
    private programaService: ProgramaService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();

    this.programa = this.programaService.getPrograma();
    this.variableEntidad = this.programa.nombreprograma;
    this.route.params.subscribe(params => {
      this.idPrograma = params['id'];
      this.cargaPublicacionPorPrograma(this.idPrograma);
    });
  }

  cargaPublicacionPorPrograma(id) {
    this.publicacionService.getRecuperaPublicacionPorPrograma(id).subscribe(
      res => {
        if (res) {
          this.publicacionArray = res.json();
          this.publicacionArray.forEach(element => {
            /*this.programaService.getRecuperaProgramaPorId(element.programaId).subscribe(result => {
              if (result) {
                this.programa = result.json();
                element.programaItem = this.programa.nombreprograma;
              }
            }); DETAILS */
          });
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the publicacions.', 'error');
      }
    );
  }

  setClickedRowEditaPublicacion(index, publicacion) {
    this.publicacionService.setPublicacion(publicacion);
    this.router.navigate(['../../../publicacion-details/editar/', this.idPrograma], { relativeTo: this.route });
  }

  setClickedRowEliminaPublicacion(index, publicacion) {
    this.publicacionService.setPublicacion(publicacion);
    this.router.navigate(['../../../publicacion-details/eliminar/', this.idPrograma], { relativeTo: this.route });
  }

  getPublicacion() {
    this.router.navigate(['../../../publicacion-details/agregar/', this.idPrograma], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
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
        this.publicacion_create = true;
        this.publicacion_delete = true;
        this.publicacion_read = true;
        this.publicacion_update = true;
      }

      if (element.code == '*:*') {
        this.publicacion_create = true;
        this.publicacion_delete = true;
        this.publicacion_read = true;
        this.publicacion_update = true;
      }
    });
  }
}
