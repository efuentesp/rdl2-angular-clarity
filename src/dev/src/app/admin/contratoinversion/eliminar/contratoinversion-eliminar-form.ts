/* PSG  Contratoinversion Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Contratoinversion } from '../contratoinversion.psg.model';
import { ContratoinversionService } from '../contratoinversion.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-contratoinversion-eliminar',
  styleUrls: ['../contratoinversion.psg.scss'],
  templateUrl: './contratoinversion-eliminar.psg.html',
})
export class ContratoinversionEliminarForm {
  contratoinversionForm: FormGroup;
  submitted = false;
  loading = false;
  public contratoinversion: Contratoinversion = new Contratoinversion();
  public idContratoinversion: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private contratoinversionService: ContratoinversionService
  ) {
    this.contratoinversionForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      tipocontrato: new FormControl({ value: '', disabled: true }),
      tipocontratoItem: new FormControl({ value: '', disabled: true }),
      intermediario: new FormControl({ value: '', disabled: true }),
      intermediarioItem: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      nombrecontacto1: new FormControl({ value: '', disabled: true }),
      nombrecontacto2: new FormControl({ value: '', disabled: true }),
      resparamliq: new FormControl({ value: '', disabled: true }),
      resparamliqItem: new FormControl({ value: '', disabled: true }),
      enviorecursosinv: new FormControl({ value: '', disabled: true }),
      enviorecursosinvItem: new FormControl({ value: '', disabled: true }),
      transferenciarecdesinver: new FormControl({ value: '', disabled: true }),
      transferenciarecdesinverItem: new FormControl({ value: '', disabled: true }),
      retenerisr: new FormControl({ value: '', disabled: true }),
      retenerisrItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      fechavencimientoAux: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      contratoiversion: new FormControl({ value: '', disabled: true }),
      contratootrasinst: new FormControl({ value: '', disabled: true }),
      contacto1lada: new FormControl({ value: '', disabled: true }),
      contacto1telefono: new FormControl({ value: '', disabled: true }),
      contacto1ext: new FormControl({ value: '', disabled: true }),
      contacto2lada: new FormControl({ value: '', disabled: true }),
      contacto2telefono: new FormControl({ value: '', disabled: true }),
      contacto2ext: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      cuenta: new FormControl({ value: '', disabled: true }),
      traspasoentresubfiso: new FormControl({ value: '', disabled: true }),
      traspasoentresubfisoItem: new FormControl({ value: '', disabled: true }),
      fechaaperturaAux: new FormControl({ value: '', disabled: true }),
      origenrecursos: new FormControl({ value: '', disabled: true }),
      origenrecursosItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Contratoinversion eliminar()');

    this.recuperaContratoinversion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaContratoinversion() {
    this.contratoinversion = this.contratoinversionService.getContratoinversion();
    this.contratoinversionForm.controls['fideicomisoId'].setValue(this.contratoinversion.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.contratoinversion.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.contratoinversionForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.contratoinversionForm.controls['tipocontrato'].setValue(this.contratoinversion.tipocontrato);
    this.contratoinversionForm.controls['intermediario'].setValue(this.contratoinversion.intermediario);
    this.contratoinversionForm.controls['moneda'].setValue(this.contratoinversion.moneda);
    this.contratoinversionForm.controls['nombrecontacto1'].setValue(this.contratoinversion.nombrecontacto1);
    this.contratoinversionForm.controls['nombrecontacto2'].setValue(this.contratoinversion.nombrecontacto2);
    this.contratoinversionForm.controls['resparamliq'].setValue(this.contratoinversion.resparamliq);
    this.contratoinversionForm.controls['enviorecursosinv'].setValue(this.contratoinversion.enviorecursosinv);
    this.contratoinversionForm.controls['transferenciarecdesinver'].setValue(
      this.contratoinversion.transferenciarecdesinver
    );
    this.contratoinversionForm.controls['retenerisr'].setValue(this.contratoinversion.retenerisr);
    this.contratoinversionForm.controls['subfisoId'].setValue(this.contratoinversion.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.contratoinversion.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.contratoinversionForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.contratoinversionForm.controls['fechavencimientoAux'].setValue(
      this.datePipe.transform(this.contratoinversion.fechavencimiento, 'dd/MM/yyyy')
    );
    this.contratoinversionForm.controls['estatus'].setValue(this.contratoinversion.estatus);
    this.contratoinversionForm.controls['contratoiversion'].setValue(this.contratoinversion.contratoiversion);
    this.contratoinversionForm.controls['contratootrasinst'].setValue(this.contratoinversion.contratootrasinst);
    this.contratoinversionForm.controls['contacto1lada'].setValue(this.contratoinversion.contacto1lada);
    this.contratoinversionForm.controls['contacto1telefono'].setValue(this.contratoinversion.contacto1telefono);
    this.contratoinversionForm.controls['contacto1ext'].setValue(this.contratoinversion.contacto1ext);
    this.contratoinversionForm.controls['contacto2lada'].setValue(this.contratoinversion.contacto2lada);
    this.contratoinversionForm.controls['contacto2telefono'].setValue(this.contratoinversion.contacto2telefono);
    this.contratoinversionForm.controls['contacto2ext'].setValue(this.contratoinversion.contacto2ext);
    this.contratoinversionForm.controls['nombre'].setValue(this.contratoinversion.nombre);
    this.contratoinversionForm.controls['cuenta'].setValue(this.contratoinversion.cuenta);
    this.contratoinversionForm.controls['traspasoentresubfiso'].setValue(this.contratoinversion.traspasoentresubfiso);
    this.contratoinversionForm.controls['fechaaperturaAux'].setValue(
      this.datePipe.transform(this.contratoinversion.fechaapertura, 'dd/MM/yyyy')
    );
    this.contratoinversionForm.controls['origenrecursos'].setValue(this.contratoinversion.origenrecursos);
  }

  eliminaContratoinversion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idContratoinversion = params['id'];
    });

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ordensimplificada!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(isConfirm => {
      if (isConfirm.value) {
        this.contratoinversionService.deleteContratoinversion(this.idContratoinversion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Contratoinversion item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Contratos de inversión save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Contratos de inversión no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Contratos de inversión deleted unsuccessfully", "error");
      }
    });
  }

  regresaContratoinversion() {
    this.location.back();
  }
}
