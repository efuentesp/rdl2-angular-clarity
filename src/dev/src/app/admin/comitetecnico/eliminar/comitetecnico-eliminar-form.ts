/* PSG  Comitetecnico Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Comitetecnico } from '../comitetecnico.psg.model';
import { ComitetecnicoService } from '../comitetecnico.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-comitetecnico-eliminar',
  styleUrls: ['../comitetecnico.psg.scss'],
  templateUrl: './comitetecnico-eliminar.psg.html',
})
export class ComitetecnicoEliminarForm {
  comitetecnicoForm: FormGroup;
  submitted = false;
  loading = false;
  public comitetecnico: Comitetecnico = new Comitetecnico();
  public idComitetecnico: string;
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
    private comitetecnicoService: ComitetecnicoService
  ) {
    this.comitetecnicoForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      integracion: new FormControl({ value: '', disabled: true }),
      facultades: new FormControl({ value: '', disabled: true }),
      comentarios: new FormControl({ value: '', disabled: true }),
      fechaconstitucionAux: new FormControl({ value: '', disabled: true }),
      miembrosquorum: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      nombrepresidentepropietario: new FormControl({ value: '', disabled: true }),
      rfcpresidentepropietario: new FormControl({ value: '', disabled: true }),
      nacionalidadpresidentepropietario: new FormControl({ value: '', disabled: true }),
      nacionalidadpresidentepropietarioItem: new FormControl({ value: '', disabled: true }),
      peppresidentepropietario: new FormControl({ value: '', disabled: true }),
      peppresidentepropietarioItem: new FormControl({ value: '', disabled: true }),
      nombrepresidentesuplente: new FormControl({ value: '', disabled: true }),
      rfcpresidentesuplente: new FormControl({ value: '', disabled: true }),
      nacionalidadpresidentesuplente: new FormControl({ value: '', disabled: true }),
      nacionalidadpresidentesuplenteItem: new FormControl({ value: '', disabled: true }),
      peppresidentesuplente: new FormControl({ value: '', disabled: true }),
      peppresidentesuplenteItem: new FormControl({ value: '', disabled: true }),
      nombresecretariopropietario: new FormControl({ value: '', disabled: true }),
      rfcsecretariopropietario: new FormControl({ value: '', disabled: true }),
      nacionalidadsecretariopropietario: new FormControl({ value: '', disabled: true }),
      nacionalidadsecretariopropietarioItem: new FormControl({ value: '', disabled: true }),
      pepsecretariopropietario: new FormControl({ value: '', disabled: true }),
      pepsecretariopropietarioItem: new FormControl({ value: '', disabled: true }),
      nombresecretariosuplente: new FormControl({ value: '', disabled: true }),
      rfcsecretariosuplente: new FormControl({ value: '', disabled: true }),
      nacionalidadsecretariosuplente: new FormControl({ value: '', disabled: true }),
      nacionalidadsecretariosuplenteItem: new FormControl({ value: '', disabled: true }),
      pepsecretariosuplente: new FormControl({ value: '', disabled: true }),
      pepsecretariosuplenteItem: new FormControl({ value: '', disabled: true }),
      nombrevocalpropietario: new FormControl({ value: '', disabled: true }),
      rfcvocalpropietario: new FormControl({ value: '', disabled: true }),
      nacionalidadvocalpropietario: new FormControl({ value: '', disabled: true }),
      nacionalidadvocalpropietarioItem: new FormControl({ value: '', disabled: true }),
      pepvocalpropietario: new FormControl({ value: '', disabled: true }),
      pepvocalpropietarioItem: new FormControl({ value: '', disabled: true }),
      nombrevocalsuplente: new FormControl({ value: '', disabled: true }),
      rfcvocalsuplente: new FormControl({ value: '', disabled: true }),
      nacionalidadvocalsuplente: new FormControl({ value: '', disabled: true }),
      nacionalidadvocalsuplenteItem: new FormControl({ value: '', disabled: true }),
      pepvocalsuplente: new FormControl({ value: '', disabled: true }),
      pepvocalsuplenteItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Comitetecnico eliminar()');

    this.recuperaComitetecnico();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaComitetecnico() {
    this.comitetecnico = this.comitetecnicoService.getComitetecnico();
    this.comitetecnicoForm.controls['fideicomisoId'].setValue(this.comitetecnico.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.comitetecnico.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.comitetecnicoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.comitetecnicoForm.controls['nombre'].setValue(this.comitetecnico.nombre);
    this.comitetecnicoForm.controls['integracion'].setValue(this.comitetecnico.integracion);
    this.comitetecnicoForm.controls['facultades'].setValue(this.comitetecnico.facultades);
    this.comitetecnicoForm.controls['comentarios'].setValue(this.comitetecnico.comentarios);
    this.comitetecnicoForm.controls['fechaconstitucionAux'].setValue(
      this.datePipe.transform(this.comitetecnico.fechaconstitucion, 'dd/MM/yyyy')
    );
    this.comitetecnicoForm.controls['miembrosquorum'].setValue(this.comitetecnico.miembrosquorum);
    this.comitetecnicoForm.controls['estatus'].setValue(this.comitetecnico.estatus);
    this.comitetecnicoForm.controls['nombrepresidentepropietario'].setValue(
      this.comitetecnico.nombrepresidentepropietario
    );
    this.comitetecnicoForm.controls['rfcpresidentepropietario'].setValue(this.comitetecnico.rfcpresidentepropietario);
    this.comitetecnicoForm.controls['nacionalidadpresidentepropietario'].setValue(
      this.comitetecnico.nacionalidadpresidentepropietario
    );
    this.comitetecnicoForm.controls['peppresidentepropietario'].setValue(this.comitetecnico.peppresidentepropietario);
    this.comitetecnicoForm.controls['nombrepresidentesuplente'].setValue(this.comitetecnico.nombrepresidentesuplente);
    this.comitetecnicoForm.controls['rfcpresidentesuplente'].setValue(this.comitetecnico.rfcpresidentesuplente);
    this.comitetecnicoForm.controls['nacionalidadpresidentesuplente'].setValue(
      this.comitetecnico.nacionalidadpresidentesuplente
    );
    this.comitetecnicoForm.controls['peppresidentesuplente'].setValue(this.comitetecnico.peppresidentesuplente);
    this.comitetecnicoForm.controls['nombresecretariopropietario'].setValue(
      this.comitetecnico.nombresecretariopropietario
    );
    this.comitetecnicoForm.controls['rfcsecretariopropietario'].setValue(this.comitetecnico.rfcsecretariopropietario);
    this.comitetecnicoForm.controls['nacionalidadsecretariopropietario'].setValue(
      this.comitetecnico.nacionalidadsecretariopropietario
    );
    this.comitetecnicoForm.controls['pepsecretariopropietario'].setValue(this.comitetecnico.pepsecretariopropietario);
    this.comitetecnicoForm.controls['nombresecretariosuplente'].setValue(this.comitetecnico.nombresecretariosuplente);
    this.comitetecnicoForm.controls['rfcsecretariosuplente'].setValue(this.comitetecnico.rfcsecretariosuplente);
    this.comitetecnicoForm.controls['nacionalidadsecretariosuplente'].setValue(
      this.comitetecnico.nacionalidadsecretariosuplente
    );
    this.comitetecnicoForm.controls['pepsecretariosuplente'].setValue(this.comitetecnico.pepsecretariosuplente);
    this.comitetecnicoForm.controls['nombrevocalpropietario'].setValue(this.comitetecnico.nombrevocalpropietario);
    this.comitetecnicoForm.controls['rfcvocalpropietario'].setValue(this.comitetecnico.rfcvocalpropietario);
    this.comitetecnicoForm.controls['nacionalidadvocalpropietario'].setValue(
      this.comitetecnico.nacionalidadvocalpropietario
    );
    this.comitetecnicoForm.controls['pepvocalpropietario'].setValue(this.comitetecnico.pepvocalpropietario);
    this.comitetecnicoForm.controls['nombrevocalsuplente'].setValue(this.comitetecnico.nombrevocalsuplente);
    this.comitetecnicoForm.controls['rfcvocalsuplente'].setValue(this.comitetecnico.rfcvocalsuplente);
    this.comitetecnicoForm.controls['nacionalidadvocalsuplente'].setValue(this.comitetecnico.nacionalidadvocalsuplente);
    this.comitetecnicoForm.controls['pepvocalsuplente'].setValue(this.comitetecnico.pepvocalsuplente);
  }

  eliminaComitetecnico() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idComitetecnico = params['id'];
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
        this.comitetecnicoService.deleteComitetecnico(this.idComitetecnico).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Comitetecnico item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Comité Técnico save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Comité Técnico no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Comité Técnico deleted unsuccessfully", "error");
      }
    });
  }

  regresaComitetecnico() {
    this.location.back();
  }
}
