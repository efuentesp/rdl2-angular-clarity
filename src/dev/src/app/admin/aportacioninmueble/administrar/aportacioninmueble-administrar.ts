/* PSG  Aportacioninmueble Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Aportacioninmueble } from '../aportacioninmueble.psg.model';
import { AportacioninmuebleService } from '../aportacioninmueble.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aportacioninmueble',
  styleUrls: ['../aportacioninmueble.psg.scss'],
  templateUrl: './aportacioninmueble-administrar.psg.html',
})
export class AportacioninmuebleAdministrar {
  aportacioninmuebleArray: Aportacioninmueble[];
  aportacioninmueble: Aportacioninmueble;
  idAportacioninmueble: number;
  loading = false;

  public fideicomiso: Fideicomiso;
  public subfiso: Subfiso;

  // Detalles
  idFideicomiso: number;
  idSubfiso: number;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  aportacioninmueble_update: boolean = false;
  aportacioninmueble_delete: boolean = false;
  aportacioninmueble_create: boolean = false;
  aportacioninmueble_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private aportacioninmuebleService: AportacioninmuebleService
  ) {}

  ngOnInit() {
    console.log('Aportacioninmueble administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAportacioninmueble();

    this.route.params.subscribe(params => {
      this.idAportacioninmueble = params['id'];
    });

    if (this.idAportacioninmueble !== undefined) {
      this.getRecuperaAportacioninmueblePorFideicomiso(this.idAportacioninmueble);
    }
    if (this.idAportacioninmueble !== undefined) {
      this.getRecuperaAportacioninmueblePorSubfiso(this.idAportacioninmueble);
    }
  }

  cargaAportacioninmueble() {
    this.aportacioninmuebleService.getRecuperaAportacioninmueble().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacioninmuebleArray = res.json();
            this.llenaCampos(this.aportacioninmuebleArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Aportación del inmueble.', 'error');
      }
    );
  }

  getRecuperaAportacioninmueblePorFideicomiso(id) {
    this.aportacioninmuebleService.getRecuperaAportacioninmueblePorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacioninmuebleArray = res.json();
            this.llenaCampos(this.aportacioninmuebleArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aportacioninmueble.', 'error');
      }
    );
  }
  getRecuperaAportacioninmueblePorSubfiso(id) {
    this.aportacioninmuebleService.getRecuperaAportacioninmueblePorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacioninmuebleArray = res.json();
            this.llenaCampos(this.aportacioninmuebleArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aportacioninmueble.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
      });
      element.fechaaltaAux = new Date(element.fechaalta);
      if (element.tipoinmueble == 'TIPO1') {
        element.tipoinmuebleItem = 'BODEGAS';
      }
      if (element.tipoinmueble == 'TIPO2') {
        element.tipoinmuebleItem = 'CASA HABITACIÓN';
      }
      if (element.tipoinmueble == 'TIPO3') {
        element.tipoinmuebleItem = 'CONSTRUCCIÓN EN PROCESO';
      }
      if (element.tipoinmueble == 'TIPO4') {
        element.tipoinmuebleItem = 'DEPARTAMENTO';
      }
      if (element.tipoinmueble == 'TIPO5') {
        element.tipoinmuebleItem = 'LOTE';
      }
      if (element.tipoinmueble == 'TIPO6') {
        element.tipoinmuebleItem = 'OTROS INMUEBLES';
      }
      element.fecharegistroAux = new Date(element.fecharegistro);
      if (element.tipofraccion == 'TIPO1') {
        element.tipofraccionItem = 'BODEGA';
      }
      if (element.tipofraccion == 'TIPO2') {
        element.tipofraccionItem = 'CASA HABITACIÓN';
      }
      if (element.tipofraccion == 'TIPO3') {
        element.tipofraccionItem = 'CUARTO';
      }
      if (element.tipofraccion == 'TIPO4') {
        element.tipofraccionItem = 'DEPARTAMENTO';
      }
      if (element.tipofraccion == 'TIPO5') {
        element.tipofraccionItem = 'ESTACIONAMIENTO';
      }
      if (element.inmuebleestado == 'CDMX') {
        element.inmuebleestadoItem = 'CUIDAD DE MEXICO';
      }
      if (element.inmuebleestado == 'EDOMEX') {
        element.inmuebleestadoItem = 'ESTADO DE MEXICO';
      }
      if (element.inmuebleestado == 'AGU') {
        element.inmuebleestadoItem = 'AGUASCALIENTES';
      }
      if (element.inmuebleestado == 'BJ') {
        element.inmuebleestadoItem = 'BAJA CALIFORNIA';
      }
      if (element.inmuebleestado == 'BJS') {
        element.inmuebleestadoItem = 'BAJA CALIFORNIA SUR';
      }
      if (element.inmuebleestado == 'CM') {
        element.inmuebleestadoItem = 'CAMPECHE';
      }
      if (element.inmuebleestado == 'GR') {
        element.inmuebleestadoItem = 'GUERRERO';
      }
      if (element.inmuebleestado == 'HD') {
        element.inmuebleestadoItem = 'HIDALGO';
      }
      if (element.inmuebleestado == 'JL') {
        element.inmuebleestadoItem = 'JALISCO';
      }
      if (element.inmuebleestatus == 'ACTIVO') {
        element.inmuebleestatusItem = 'ACTIVO';
      }
      if (element.inmuebleestatus == 'CANCELADO') {
        element.inmuebleestatusItem = 'CANCELADO';
      }
      if (element.inmuebleestatus == 'SUSPENDIDO') {
        element.inmuebleestatusItem = 'SUSPENDIDO';
      }
      if (element.inmuebleestatus == 'BAJA') {
        element.inmuebleestatusItem = 'BAJA';
      }
      if (element.datosconstitucionescritura == 'PUBLICA') {
        element.datosconstitucionescrituraItem = 'Escritura pública';
      }
      if (element.datosconstitucionescritura == 'OTRO') {
        element.datosconstitucionescrituraItem = 'Otro';
      }
      if (element.datosconstitucionnombrenotario == 'NOTARIO01') {
        element.datosconstitucionnombrenotarioItem = 'NOTARIO 01';
      }
      if (element.datosconstitucionnombrenotario == 'NOTARIO02') {
        element.datosconstitucionnombrenotarioItem = 'NOTARIO 02';
      }
      if (element.datosconstitucionnombrenotario == 'NOTARIO03') {
        element.datosconstitucionnombrenotarioItem = 'NOTARIO 03';
      }
      element.datosconstitucionfecharppAux = new Date(element.datosconstitucionfecharpp);
      element.datosconstitucionfechaescrituraAux = new Date(element.datosconstitucionfechaescritura);
    });
  }

  setClickedRowEditaAportacioninmueble(index, aportacioninmueble) {
    this.aportacioninmuebleService.setAportacioninmueble(aportacioninmueble);
    if (this.idAportacioninmueble === undefined) {
      this.router.navigate(['editar', aportacioninmueble.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', aportacioninmueble.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAportacioninmueble(index, aportacioninmueble) {
    this.aportacioninmuebleService.setAportacioninmueble(aportacioninmueble);
    if (this.idAportacioninmueble === undefined) {
      this.router.navigate(['eliminar', aportacioninmueble.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', aportacioninmueble.id], { relativeTo: this.route });
    }
  }

  getAportacioninmueble() {
    if (this.idAportacioninmueble === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAportacioninmueble], { relativeTo: this.route });
    }
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == '*:*') {
        this.aportacioninmueble_create = true;
        this.aportacioninmueble_delete = true;
        this.aportacioninmueble_update = true;
        this.aportacioninmueble_read = true;
      }

      if (element.code == 'APORTACIONINMUEBLE:UPDATE') {
        this.aportacioninmueble_update = true;
      }

      if (element.code == 'APORTACIONINMUEBLE:DELETE') {
        this.aportacioninmueble_delete = true;
      }

      if (element.code == 'APORTACIONINMUEBLE:READ') {
        this.aportacioninmueble_read = true;
      }

      if (element.code == 'APORTACIONINMUEBLE:CREATE') {
        this.aportacioninmueble_create = true;
      }

      if (element.code == 'APORTACIONINMUEBLE:*') {
        this.aportacioninmueble_update = true;
        this.aportacioninmueble_create = true;
        this.aportacioninmueble_delete = true;
        this.aportacioninmueble_read = true;
      }
    });
  }
}
