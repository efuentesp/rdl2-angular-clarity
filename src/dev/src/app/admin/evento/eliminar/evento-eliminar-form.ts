import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Evento } from '../evento.psg.model';
import { EventoService } from '../evento.psg.service';

@Component({
  selector: 'clr-evento-angular',
  styleUrls: ['../evento.psg.scss'],
  templateUrl: './evento-eliminar.psg.html',
})
export class EventoEliminarFormDemo {
  eventoForm: FormGroup;
  submitted = false;
  public evento: Evento = new Evento();
  public idEvento: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {
    this.eventoForm = this.fb.group({
      organizadoporId: new FormControl({ value: '', disabled: true }),
      organizadoporItem: new FormControl({ value: '', disabled: true }),
      impartidoporId: new FormControl({ value: '', disabled: true }),
      impartidoporItem: new FormControl({ value: '', disabled: true }),
      clave: new FormControl({ value: '', disabled: true }),
      fechaeventoAux: new FormControl({ value: '', disabled: true }),
      titulo: new FormControl({ value: '', disabled: true }),
      duracion: new FormControl({ value: '', disabled: true }),
      lugar: new FormControl({ value: '', disabled: true }),
      cartel: new FormControl({ value: '', disabled: true }),
      tipoestatus: new FormControl({ value: '', disabled: true }),
      tipoestatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaEvento();
  }

  recuperaEvento() {
    this.evento = this.eventoService.getEvento();
    this.eventoForm.controls['organizadoporId'].setValue(this.evento.organizadoporId);
    this.eventoForm.controls['impartidoporId'].setValue(this.evento.impartidoporId);
    this.eventoForm.controls['clave'].setValue(this.evento.clave);
    this.eventoForm.controls['fechaeventoAux'].setValue(this.datePipe.transform(this.evento.fechaevento, 'dd/MM/yyyy'));
    this.eventoForm.controls['titulo'].setValue(this.evento.titulo);
    this.eventoForm.controls['duracion'].setValue(this.evento.duracion);
    this.eventoForm.controls['lugar'].setValue(this.evento.lugar);
    this.eventoForm.controls['cartel'].setValue(this.evento.cartel);
    this.eventoForm.controls['tipoestatus'].setValue(this.evento.tipoestatus);
  }

  eliminaEvento() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idEvento = params['id'];
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
        this.eventoService.deleteEvento(this.idEvento).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Evento item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Evento save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Evento no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaEvento() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
