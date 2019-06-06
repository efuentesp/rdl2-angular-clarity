/* PSG  Documentosfideicomiso Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Documentosfideicomiso } from '../documentosfideicomiso.psg.model';
import { DocumentosfideicomisoService } from '../documentosfideicomiso.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-documentosfideicomiso',
  styleUrls: ['../documentosfideicomiso.psg.scss'],
  templateUrl: './documentosfideicomiso-administrar.psg.html',
})
export class DocumentosfideicomisoAdministrar {
  documentosfideicomisoArray: Documentosfideicomiso[];
  documentosfideicomiso: Documentosfideicomiso;
  idDocumentosfideicomiso: number;
  loading = false;

  public fideicomiso: Fideicomiso;

  // Detalles
  idFideicomiso: number;

  // Modal
  modalfideicomiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  documentosfideicomiso_update: boolean = false;
  documentosfideicomiso_delete: boolean = false;
  documentosfideicomiso_create: boolean = false;
  documentosfideicomiso_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private documentosfideicomisoService: DocumentosfideicomisoService
  ) {}

  ngOnInit() {
    console.log('Documentosfideicomiso administrar()');

    this.getUser();
    this.setButtons();
    this.cargaDocumentosfideicomiso();

    this.route.params.subscribe(params => {
      this.idDocumentosfideicomiso = params['id'];
    });

    if (this.idDocumentosfideicomiso !== undefined) {
      this.getRecuperaDocumentosfideicomisoPorFideicomiso(this.idDocumentosfideicomiso);
    }
  }

  cargaDocumentosfideicomiso() {
    this.documentosfideicomisoService.getRecuperaDocumentosfideicomiso().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.documentosfideicomisoArray = res.json();
            this.llenaCampos(this.documentosfideicomisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Check list de documentos del fideicomiso.', 'error');
      }
    );
  }

  getRecuperaDocumentosfideicomisoPorFideicomiso(id) {
    this.documentosfideicomisoService.getRecuperaDocumentosfideicomisoPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.documentosfideicomisoArray = res.json();
            this.llenaCampos(this.documentosfideicomisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the documentosfideicomiso.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.contratofideicomiso == 'NO') {
        element.contratofideicomisoItem = 'NO';
      }
      if (element.contratofideicomiso == 'SI') {
        element.contratofideicomisoItem = 'SI';
      }
      if (element.actasconstitutivas == 'NO') {
        element.actasconstitutivasItem = 'NO';
      }
      if (element.actasconstitutivas == 'SI') {
        element.actasconstitutivasItem = 'SI';
      }
      if (element.cedulafiscal == 'NO') {
        element.cedulafiscalItem = 'NO';
      }
      if (element.cedulafiscal == 'SI') {
        element.cedulafiscalItem = 'SI';
      }
      if (element.poderes == 'NO') {
        element.poderesItem = 'NO';
      }
      if (element.poderes == 'SI') {
        element.poderesItem = 'SI';
      }
      if (element.identificadores == 'NO') {
        element.identificadoresItem = 'NO';
      }
      if (element.identificadores == 'SI') {
        element.identificadoresItem = 'SI';
      }
      if (element.comprobantesdomicilio == 'NO') {
        element.comprobantesdomicilioItem = 'NO';
      }
      if (element.comprobantesdomicilio == 'SI') {
        element.comprobantesdomicilioItem = 'SI';
      }
      if (element.formatoskyc == 'NO') {
        element.formatoskycItem = 'NO';
      }
      if (element.formatoskyc == 'SI') {
        element.formatoskycItem = 'SI';
      }
      if (element.formatoevaluacionriesgo == 'NO') {
        element.formatoevaluacionriesgoItem = 'NO';
      }
      if (element.formatoevaluacionriesgo == 'SI') {
        element.formatoevaluacionriesgoItem = 'SI';
      }
      if (element.worldcheck == 'NO') {
        element.worldcheckItem = 'NO';
      }
      if (element.worldcheck == 'SI') {
        element.worldcheckItem = 'SI';
      }
      if (element.formatoinformacion == 'NO') {
        element.formatoinformacionItem = 'NO';
      }
      if (element.formatoinformacion == 'SI') {
        element.formatoinformacionItem = 'SI';
      }
      if (element.autorizacioncomite == 'NO') {
        element.autorizacioncomiteItem = 'NO';
      }
      if (element.autorizacioncomite == 'SI') {
        element.autorizacioncomiteItem = 'SI';
      }
      if (element.firmascomite == 'NO') {
        element.firmascomiteItem = 'NO';
      }
      if (element.firmascomite == 'SI') {
        element.firmascomiteItem = 'SI';
      }
      if (element.curp == 'NO') {
        element.curpItem = 'NO';
      }
      if (element.curp == 'SI') {
        element.curpItem = 'SI';
      }
    });
  }

  setClickedRowEditaDocumentosfideicomiso(index, documentosfideicomiso) {
    this.documentosfideicomisoService.setDocumentosfideicomiso(documentosfideicomiso);
    if (this.idDocumentosfideicomiso === undefined) {
      this.router.navigate(['editar', documentosfideicomiso.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', documentosfideicomiso.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaDocumentosfideicomiso(index, documentosfideicomiso) {
    this.documentosfideicomisoService.setDocumentosfideicomiso(documentosfideicomiso);
    if (this.idDocumentosfideicomiso === undefined) {
      this.router.navigate(['eliminar', documentosfideicomiso.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', documentosfideicomiso.id], { relativeTo: this.route });
    }
  }

  getDocumentosfideicomiso() {
    if (this.idDocumentosfideicomiso === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idDocumentosfideicomiso], { relativeTo: this.route });
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
        this.documentosfideicomiso_create = true;
        this.documentosfideicomiso_delete = true;
        this.documentosfideicomiso_update = true;
        this.documentosfideicomiso_read = true;
      }

      if (element.code == 'DOCUMENTOSFIDEICOMISO:UPDATE') {
        this.documentosfideicomiso_update = true;
      }

      if (element.code == 'DOCUMENTOSFIDEICOMISO:DELETE') {
        this.documentosfideicomiso_delete = true;
      }

      if (element.code == 'DOCUMENTOSFIDEICOMISO:READ') {
        this.documentosfideicomiso_read = true;
      }

      if (element.code == 'DOCUMENTOSFIDEICOMISO:CREATE') {
        this.documentosfideicomiso_create = true;
      }

      if (element.code == 'DOCUMENTOSFIDEICOMISO:*') {
        this.documentosfideicomiso_update = true;
        this.documentosfideicomiso_create = true;
        this.documentosfideicomiso_delete = true;
        this.documentosfideicomiso_read = true;
      }
    });
  }
}
