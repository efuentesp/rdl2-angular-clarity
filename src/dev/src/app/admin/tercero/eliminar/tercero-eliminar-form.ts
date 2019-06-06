/* PSG  Tercero Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Tercero } from '../tercero.psg.model';
import { TerceroService } from '../tercero.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-tercero-eliminar',
  styleUrls: ['../tercero.psg.scss'],
  templateUrl: './tercero-eliminar.psg.html',
})
export class TerceroEliminarForm {
  terceroForm: FormGroup;
  submitted = false;
  loading = false;
  public tercero: Tercero = new Tercero();
  public idTercero: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private terceroService: TerceroService
  ) {
    this.terceroForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      notercero: new FormControl({ value: '', disabled: true }),
      razonsocial: new FormControl({ value: '', disabled: true }),
      nacionalidad: new FormControl({ value: '', disabled: true }),
      nacionalidadItem: new FormControl({ value: '', disabled: true }),
      actividadeconomica: new FormControl({ value: '', disabled: true }),
      actividadeconomicaItem: new FormControl({ value: '', disabled: true }),
      ladacasa: new FormControl({ value: '', disabled: true }),
      ladaoficina: new FormControl({ value: '', disabled: true }),
      ladafax: new FormControl({ value: '', disabled: true }),
      telefonocasa: new FormControl({ value: '', disabled: true }),
      telefonooficina: new FormControl({ value: '', disabled: true }),
      telefonofax: new FormControl({ value: '', disabled: true }),
      extoficina: new FormControl({ value: '', disabled: true }),
      extfax: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      fechaverfircosoftAux: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      rfc: new FormControl({ value: '', disabled: true }),
      correo: new FormControl({ value: '', disabled: true }),
      calidamigratoria: new FormControl({ value: '', disabled: true }),
      calidamigratoriaItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Tercero eliminar()');

    this.recuperaTercero();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaTercero() {
    this.tercero = this.terceroService.getTercero();
    this.terceroForm.controls['fideicomisoId'].setValue(this.tercero.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.tercero.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.terceroForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.terceroForm.controls['notercero'].setValue(this.tercero.notercero);
    this.terceroForm.controls['razonsocial'].setValue(this.tercero.razonsocial);
    this.terceroForm.controls['nacionalidad'].setValue(this.tercero.nacionalidad);
    this.terceroForm.controls['actividadeconomica'].setValue(this.tercero.actividadeconomica);
    this.terceroForm.controls['ladacasa'].setValue(this.tercero.ladacasa);
    this.terceroForm.controls['ladaoficina'].setValue(this.tercero.ladaoficina);
    this.terceroForm.controls['ladafax'].setValue(this.tercero.ladafax);
    this.terceroForm.controls['telefonocasa'].setValue(this.tercero.telefonocasa);
    this.terceroForm.controls['telefonooficina'].setValue(this.tercero.telefonooficina);
    this.terceroForm.controls['telefonofax'].setValue(this.tercero.telefonofax);
    this.terceroForm.controls['extoficina'].setValue(this.tercero.extoficina);
    this.terceroForm.controls['extfax'].setValue(this.tercero.extfax);
    this.terceroForm.controls['estatus'].setValue(this.tercero.estatus);
    this.terceroForm.controls['fechaverfircosoftAux'].setValue(
      this.datePipe.transform(this.tercero.fechaverfircosoft, 'dd/MM/yyyy')
    );
    this.terceroForm.controls['tipopersona'].setValue(this.tercero.tipopersona);
    this.terceroForm.controls['rfc'].setValue(this.tercero.rfc);
    this.terceroForm.controls['correo'].setValue(this.tercero.correo);
    this.terceroForm.controls['calidamigratoria'].setValue(this.tercero.calidamigratoria);
  }

  eliminaTercero() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idTercero = params['id'];
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
        this.terceroService.deleteTercero(this.idTercero).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Tercero item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Tercero save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Tercero no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Tercero deleted unsuccessfully", "error");
      }
    });
  }

  regresaTercero() {
    this.location.back();
  }
}
