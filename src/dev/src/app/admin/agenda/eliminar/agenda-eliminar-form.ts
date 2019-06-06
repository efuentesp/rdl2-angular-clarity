/* PSG  Agenda Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Agenda } from '../agenda.psg.model';
import { AgendaService } from '../agenda.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-agenda-eliminar',
  styleUrls: ['../agenda.psg.scss'],
  templateUrl: './agenda-eliminar.psg.html',
})
export class AgendaEliminarForm {
  agendaForm: FormGroup;
  submitted = false;
  loading = false;
  public agenda: Agenda = new Agenda();
  public idAgenda: string;
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
    private agendaService: AgendaService
  ) {
    this.agendaForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      evento: new FormControl({ value: '', disabled: true }),
      fecha: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      observacion: new FormControl({ value: '', disabled: true }),
      concovados: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Agenda eliminar()');

    this.recuperaAgenda();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAgenda() {
    this.agenda = this.agendaService.getAgenda();
    this.agendaForm.controls['fideicomisoId'].setValue(this.agenda.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.agenda.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.agendaForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.agendaForm.controls['subfisoId'].setValue(this.agenda.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.agenda.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.agendaForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.agendaForm.controls['evento'].setValue(this.agenda.evento);
    this.agendaForm.controls['fecha'].setValue(this.agenda.fecha);
    this.agendaForm.controls['estatus'].setValue(this.agenda.estatus);
    this.agendaForm.controls['observacion'].setValue(this.agenda.observacion);
    this.agendaForm.controls['concovados'].setValue(this.agenda.concovados);
  }

  eliminaAgenda() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAgenda = params['id'];
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
        this.agendaService.deleteAgenda(this.idAgenda).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Agenda item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Agenda save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Agenda no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Agenda deleted unsuccessfully", "error");
      }
    });
  }

  regresaAgenda() {
    this.location.back();
  }
}
