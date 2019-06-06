/* PSG  Contratoinversion Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Contratoinversion } from '../contratoinversion.psg.model';
import { ContratoinversionService } from '../contratoinversion.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-contratoinversion',
  styleUrls: ['../contratoinversion.psg.scss'],
  templateUrl: './contratoinversion-administrar.psg.html',
})
export class ContratoinversionAdministrar {
  contratoinversionArray: Contratoinversion[];
  contratoinversion: Contratoinversion;
  idContratoinversion: number;
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

  contratoinversion_update: boolean = false;
  contratoinversion_delete: boolean = false;
  contratoinversion_create: boolean = false;
  contratoinversion_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private contratoinversionService: ContratoinversionService
  ) {}

  ngOnInit() {
    console.log('Contratoinversion administrar()');

    this.getUser();
    this.setButtons();
    this.cargaContratoinversion();

    this.route.params.subscribe(params => {
      this.idContratoinversion = params['id'];
    });

    if (this.idContratoinversion !== undefined) {
      this.getRecuperaContratoinversionPorFideicomiso(this.idContratoinversion);
    }
    if (this.idContratoinversion !== undefined) {
      this.getRecuperaContratoinversionPorSubfiso(this.idContratoinversion);
    }
  }

  cargaContratoinversion() {
    this.contratoinversionService.getRecuperaContratoinversion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.contratoinversionArray = res.json();
            this.llenaCampos(this.contratoinversionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Contratos de inversión.', 'error');
      }
    );
  }

  getRecuperaContratoinversionPorFideicomiso(id) {
    this.contratoinversionService.getRecuperaContratoinversionPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.contratoinversionArray = res.json();
            this.llenaCampos(this.contratoinversionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the contratoinversion.', 'error');
      }
    );
  }
  getRecuperaContratoinversionPorSubfiso(id) {
    this.contratoinversionService.getRecuperaContratoinversionPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.contratoinversionArray = res.json();
            this.llenaCampos(this.contratoinversionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the contratoinversion.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tipocontrato == 'CONTRATO1') {
        element.tipocontratoItem = 'CUENTA DE CHEQUES SCOTIABANK';
      }
      if (element.tipocontrato == 'CONTRATO2') {
        element.tipocontratoItem = 'CUENTA DE CHEQUES SCOTIABANK PATRIMONIAL';
      }
      if (element.tipocontrato == 'CONTRATO3') {
        element.tipocontratoItem = 'CUENTA DE CHEQUES OTRA INSTITUCION';
      }
      if (element.tipocontrato == 'CONTRATO4') {
        element.tipocontratoItem = 'INVERSION C/INTERFASE';
      }
      if (element.tipocontrato == 'CONTRATO5') {
        element.tipocontratoItem = 'INVERSION S/INTERFASE';
      }
      if (element.intermediario == 'INTERMEDIARIO2') {
        element.intermediarioItem = 'BANCO INBURSA S.A.';
      }
      if (element.intermediario == 'INTERMEDIARIO3') {
        element.intermediarioItem = 'BANSI, S.A.';
      }
      if (element.intermediario == 'INTERMEDIARIO4') {
        element.intermediarioItem = 'BANAMEX, S.A.';
      }
      if (element.intermediario == 'INTERMEDIARIO5') {
        element.intermediarioItem = 'HSBC MEXICO S.A.';
      }
      if (element.moneda == 'DLS') {
        element.monedaItem = 'DLS. U.S.A.';
      }
      if (element.moneda == 'EURO') {
        element.monedaItem = 'EUROS';
      }
      if (element.moneda == 'NACIONAL') {
        element.monedaItem = 'MONEDA NACIONAL';
      }
      if (element.resparamliq == 'NO') {
        element.resparamliqItem = 'NO';
      }
      if (element.resparamliq == 'SI') {
        element.resparamliqItem = 'SI';
      }
      if (element.enviorecursosinv == 'ENV1') {
        element.enviorecursosinvItem = 'FIDEICOMISARIO';
      }
      if (element.enviorecursosinv == 'ENV2') {
        element.enviorecursosinvItem = 'FIDEICOMITENTE';
      }
      if (element.enviorecursosinv == 'ENV3') {
        element.enviorecursosinvItem = 'TERCERO';
      }
      if (element.transferenciarecdesinver == 'RECEP1') {
        element.transferenciarecdesinverItem = 'CUENTA CONCENTRADORA';
      }
      if (element.transferenciarecdesinver == 'RECEP2') {
        element.transferenciarecdesinverItem = 'CUENTA CONCENTRADORA GENERAL';
      }
      if (element.transferenciarecdesinver == 'RECEP3') {
        element.transferenciarecdesinverItem = 'CUENTA CONCENTRADORA INDIVIDUAL';
      }
      if (element.transferenciarecdesinver == 'RECEP4') {
        element.transferenciarecdesinverItem = 'CUENTA PARTICULAR (SCOTIABANK)';
      }
      if (element.retenerisr == 'NO') {
        element.retenerisrItem = 'NO';
      }
      if (element.retenerisr == 'SI') {
        element.retenerisrItem = 'SI';
      }
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
      });
      element.fechavencimientoAux = new Date(element.fechavencimiento);
      if (element.estatus == 'ACTIVO') {
        element.estatusItem = 'ACTIVO';
      }
      if (element.estatus == 'CANCELADO') {
        element.estatusItem = 'CANCELADO';
      }
      if (element.estatus == 'SUSPENDIDO') {
        element.estatusItem = 'SUSPENDIDO';
      }
      if (element.estatus == 'BAJA') {
        element.estatusItem = 'BAJA';
      }
      if (element.traspasoentresubfiso == 'NO') {
        element.traspasoentresubfisoItem = 'NO';
      }
      if (element.traspasoentresubfiso == 'SI') {
        element.traspasoentresubfisoItem = 'SI';
      }
      element.fechaaperturaAux = new Date(element.fechaapertura);
      if (element.origenrecursos == 'ORIGEN1') {
        element.origenrecursosItem = 'APORTACIONES SOLIDARIOS';
      }
      if (element.origenrecursos == 'ORIGEN2') {
        element.origenrecursosItem = 'CLIENTES MEXDER';
      }
      if (element.origenrecursos == 'ORIGEN3') {
        element.origenrecursosItem = 'FIDEICOMITENTE A';
      }
      if (element.origenrecursos == 'ORIGEN4') {
        element.origenrecursosItem = 'GOBIERNO ESTATAL';
      }
      if (element.origenrecursos == 'ORIGEN5') {
        element.origenrecursosItem = 'GOBIERNO FEDERAL';
      }
      if (element.origenrecursos == 'ORIGEN6') {
        element.origenrecursosItem = 'GOBIERNO MUNICIPAL';
      }
      if (element.origenrecursos == 'ORIGEN7') {
        element.origenrecursosItem = 'PARTICULARES';
      }
      if (element.origenrecursos == 'ORIGEN8') {
        element.origenrecursosItem = 'RECURSOS DEL CONTRATO';
      }
    });
  }

  setClickedRowEditaContratoinversion(index, contratoinversion) {
    this.contratoinversionService.setContratoinversion(contratoinversion);
    if (this.idContratoinversion === undefined) {
      this.router.navigate(['editar', contratoinversion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', contratoinversion.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaContratoinversion(index, contratoinversion) {
    this.contratoinversionService.setContratoinversion(contratoinversion);
    if (this.idContratoinversion === undefined) {
      this.router.navigate(['eliminar', contratoinversion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', contratoinversion.id], { relativeTo: this.route });
    }
  }

  getContratoinversion() {
    if (this.idContratoinversion === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idContratoinversion], { relativeTo: this.route });
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
        this.contratoinversion_create = true;
        this.contratoinversion_delete = true;
        this.contratoinversion_update = true;
        this.contratoinversion_read = true;
      }

      if (element.code == 'CONTRATOINVERSION:UPDATE') {
        this.contratoinversion_update = true;
      }

      if (element.code == 'CONTRATOINVERSION:DELETE') {
        this.contratoinversion_delete = true;
      }

      if (element.code == 'CONTRATOINVERSION:READ') {
        this.contratoinversion_read = true;
      }

      if (element.code == 'CONTRATOINVERSION:CREATE') {
        this.contratoinversion_create = true;
      }

      if (element.code == 'CONTRATOINVERSION:*') {
        this.contratoinversion_update = true;
        this.contratoinversion_create = true;
        this.contratoinversion_delete = true;
        this.contratoinversion_read = true;
      }
    });
  }
}
