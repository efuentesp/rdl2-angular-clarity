/* PSG  Monitoreochekermonerario Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Monitoreochekermonerario } from '../monitoreochekermonerario.psg.model';
import { MonitoreochekermonerarioService } from '../monitoreochekermonerario.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-monitoreochekermonerario-eliminar',
  styleUrls: ['../monitoreochekermonerario.psg.scss'],
  templateUrl: './monitoreochekermonerario-eliminar.psg.html',
})
export class MonitoreochekermonerarioEliminarForm {
  monitoreochekermonerarioForm: FormGroup;
  submitted = false;
  loading = false;
  public monitoreochekermonerario: Monitoreochekermonerario = new Monitoreochekermonerario();
  public idMonitoreochekermonerario: string;
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
    private monitoreochekermonerarioService: MonitoreochekermonerarioService
  ) {
    this.monitoreochekermonerarioForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      foliooperacion: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      fechaoperacion: new FormControl({ value: '', disabled: true }),
      totalpagos: new FormControl({ value: '', disabled: true }),
      liquidados: new FormControl({ value: '', disabled: true }),
      contabilizados: new FormControl({ value: '', disabled: true }),
      pendientes: new FormControl({ value: '', disabled: true }),
      error: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Monitoreochekermonerario eliminar()');

    this.recuperaMonitoreochekermonerario();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaMonitoreochekermonerario() {
    this.monitoreochekermonerario = this.monitoreochekermonerarioService.getMonitoreochekermonerario();
    this.monitoreochekermonerarioForm.controls['fideicomisoId'].setValue(this.monitoreochekermonerario.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.monitoreochekermonerario.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.monitoreochekermonerarioForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.monitoreochekermonerarioForm.controls['subfisoId'].setValue(this.monitoreochekermonerario.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.monitoreochekermonerario.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.monitoreochekermonerarioForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.monitoreochekermonerarioForm.controls['foliooperacion'].setValue(this.monitoreochekermonerario.foliooperacion);
    this.monitoreochekermonerarioForm.controls['importe'].setValue(this.monitoreochekermonerario.importe);
    this.monitoreochekermonerarioForm.controls['fechaoperacion'].setValue(this.monitoreochekermonerario.fechaoperacion);
    this.monitoreochekermonerarioForm.controls['totalpagos'].setValue(this.monitoreochekermonerario.totalpagos);
    this.monitoreochekermonerarioForm.controls['liquidados'].setValue(this.monitoreochekermonerario.liquidados);
    this.monitoreochekermonerarioForm.controls['contabilizados'].setValue(this.monitoreochekermonerario.contabilizados);
    this.monitoreochekermonerarioForm.controls['pendientes'].setValue(this.monitoreochekermonerario.pendientes);
    this.monitoreochekermonerarioForm.controls['error'].setValue(this.monitoreochekermonerario.error);
    this.monitoreochekermonerarioForm.controls['estatus'].setValue(this.monitoreochekermonerario.estatus);
  }

  eliminaMonitoreochekermonerario() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idMonitoreochekermonerario = params['id'];
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
        this.monitoreochekermonerarioService.deleteMonitoreochekermonerario(this.idMonitoreochekermonerario).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Monitoreochekermonerario item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Monitoreo de Instrucciones de checker monetario save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Monitoreo de Instrucciones de checker monetario no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Monitoreo de Instrucciones de checker monetario deleted unsuccessfully", "error");
      }
    });
  }

  regresaMonitoreochekermonerario() {
    this.location.back();
  }
}
