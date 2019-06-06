/* PSG  Aportacioninmueble Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Aportacioninmueble } from '../aportacioninmueble.psg.model';
import { AportacioninmuebleService } from '../aportacioninmueble.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aportacioninmueble-eliminar',
  styleUrls: ['../aportacioninmueble.psg.scss'],
  templateUrl: './aportacioninmueble-eliminar.psg.html',
})
export class AportacioninmuebleEliminarForm {
  aportacioninmuebleForm: FormGroup;
  submitted = false;
  loading = false;
  public aportacioninmueble: Aportacioninmueble = new Aportacioninmueble();
  public idAportacioninmueble: string;
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
    private aportacioninmuebleService: AportacioninmuebleService
  ) {
    this.aportacioninmuebleForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      tiponegocio: new FormControl({ value: '', disabled: true }),
      producto: new FormControl({ value: '', disabled: true }),
      idinmueble: new FormControl({ value: '', disabled: true }),
      fechaaltaAux: new FormControl({ value: '', disabled: true }),
      tipoinmueble: new FormControl({ value: '', disabled: true }),
      tipoinmuebleItem: new FormControl({ value: '', disabled: true }),
      arbol: new FormControl({ value: '', disabled: true }),
      fecharegistroAux: new FormControl({ value: '', disabled: true }),
      tipofraccion: new FormControl({ value: '', disabled: true }),
      tipofraccionItem: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
      inmueblevalorinicial: new FormControl({ value: '', disabled: true }),
      inmuebleubicacion: new FormControl({ value: '', disabled: true }),
      inmuebleestado: new FormControl({ value: '', disabled: true }),
      inmuebleestadoItem: new FormControl({ value: '', disabled: true }),
      inmueblesuperficie: new FormControl({ value: '', disabled: true }),
      inmuebleindivisos: new FormControl({ value: '', disabled: true }),
      inmuebledias: new FormControl({ value: '', disabled: true }),
      inmuebleproyectoejecutivo: new FormControl({ value: '', disabled: true }),
      inmueblevaloractual: new FormControl({ value: '', disabled: true }),
      inmuebleciudad: new FormControl({ value: '', disabled: true }),
      inmueblesuperficieconstruida: new FormControl({ value: '', disabled: true }),
      inmueblefraccionamientounidad: new FormControl({ value: '', disabled: true }),
      inmuebleclavecatastral: new FormControl({ value: '', disabled: true }),
      inmueblevalor: new FormControl({ value: '', disabled: true }),
      inmuebleestatus: new FormControl({ value: '', disabled: true }),
      inmuebleestatusItem: new FormControl({ value: '', disabled: true }),
      datosconstitucionescritura: new FormControl({ value: '', disabled: true }),
      datosconstitucionescrituraItem: new FormControl({ value: '', disabled: true }),
      datosconstitucionnumescritura: new FormControl({ value: '', disabled: true }),
      datosconstitucionnombrenotario: new FormControl({ value: '', disabled: true }),
      datosconstitucionnombrenotarioItem: new FormControl({ value: '', disabled: true }),
      datosconstitucionestadonotario: new FormControl({ value: '', disabled: true }),
      datosconstituciontelefononotario: new FormControl({ value: '', disabled: true }),
      datosconstitucionfecharppAux: new FormControl({ value: '', disabled: true }),
      datosconstitucionfechaescrituraAux: new FormControl({ value: '', disabled: true }),
      datosconstitucionnumnotaria: new FormControl({ value: '', disabled: true }),
      datosconstitucionciudadnotario: new FormControl({ value: '', disabled: true }),
      datosconstitucionemailnotario: new FormControl({ value: '', disabled: true }),
      datosconstitucionnumrpp: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Aportacioninmueble eliminar()');

    this.recuperaAportacioninmueble();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAportacioninmueble() {
    this.aportacioninmueble = this.aportacioninmuebleService.getAportacioninmueble();
    this.aportacioninmuebleForm.controls['fideicomisoId'].setValue(this.aportacioninmueble.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.aportacioninmueble.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.aportacioninmuebleForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.aportacioninmuebleForm.controls['subfisoId'].setValue(this.aportacioninmueble.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.aportacioninmueble.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.aportacioninmuebleForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.aportacioninmuebleForm.controls['tiponegocio'].setValue(this.aportacioninmueble.tiponegocio);
    this.aportacioninmuebleForm.controls['producto'].setValue(this.aportacioninmueble.producto);
    this.aportacioninmuebleForm.controls['idinmueble'].setValue(this.aportacioninmueble.idinmueble);
    this.aportacioninmuebleForm.controls['fechaaltaAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.fechaalta, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['tipoinmueble'].setValue(this.aportacioninmueble.tipoinmueble);
    this.aportacioninmuebleForm.controls['arbol'].setValue(this.aportacioninmueble.arbol);
    this.aportacioninmuebleForm.controls['fecharegistroAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.fecharegistro, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['tipofraccion'].setValue(this.aportacioninmueble.tipofraccion);
    this.aportacioninmuebleForm.controls['descripcion'].setValue(this.aportacioninmueble.descripcion);
    this.aportacioninmuebleForm.controls['inmueblevalorinicial'].setValue(this.aportacioninmueble.inmueblevalorinicial);
    this.aportacioninmuebleForm.controls['inmuebleubicacion'].setValue(this.aportacioninmueble.inmuebleubicacion);
    this.aportacioninmuebleForm.controls['inmuebleestado'].setValue(this.aportacioninmueble.inmuebleestado);
    this.aportacioninmuebleForm.controls['inmueblesuperficie'].setValue(this.aportacioninmueble.inmueblesuperficie);
    this.aportacioninmuebleForm.controls['inmuebleindivisos'].setValue(this.aportacioninmueble.inmuebleindivisos);
    this.aportacioninmuebleForm.controls['inmuebledias'].setValue(this.aportacioninmueble.inmuebledias);
    this.aportacioninmuebleForm.controls['inmuebleproyectoejecutivo'].setValue(
      this.aportacioninmueble.inmuebleproyectoejecutivo
    );
    this.aportacioninmuebleForm.controls['inmueblevaloractual'].setValue(this.aportacioninmueble.inmueblevaloractual);
    this.aportacioninmuebleForm.controls['inmuebleciudad'].setValue(this.aportacioninmueble.inmuebleciudad);
    this.aportacioninmuebleForm.controls['inmueblesuperficieconstruida'].setValue(
      this.aportacioninmueble.inmueblesuperficieconstruida
    );
    this.aportacioninmuebleForm.controls['inmueblefraccionamientounidad'].setValue(
      this.aportacioninmueble.inmueblefraccionamientounidad
    );
    this.aportacioninmuebleForm.controls['inmuebleclavecatastral'].setValue(
      this.aportacioninmueble.inmuebleclavecatastral
    );
    this.aportacioninmuebleForm.controls['inmueblevalor'].setValue(this.aportacioninmueble.inmueblevalor);
    this.aportacioninmuebleForm.controls['inmuebleestatus'].setValue(this.aportacioninmueble.inmuebleestatus);
    this.aportacioninmuebleForm.controls['datosconstitucionescritura'].setValue(
      this.aportacioninmueble.datosconstitucionescritura
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnumescritura'].setValue(
      this.aportacioninmueble.datosconstitucionnumescritura
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnombrenotario'].setValue(
      this.aportacioninmueble.datosconstitucionnombrenotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionestadonotario'].setValue(
      this.aportacioninmueble.datosconstitucionestadonotario
    );
    this.aportacioninmuebleForm.controls['datosconstituciontelefononotario'].setValue(
      this.aportacioninmueble.datosconstituciontelefononotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionfecharppAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.datosconstitucionfecharpp, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['datosconstitucionfechaescrituraAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.datosconstitucionfechaescritura, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnumnotaria'].setValue(
      this.aportacioninmueble.datosconstitucionnumnotaria
    );
    this.aportacioninmuebleForm.controls['datosconstitucionciudadnotario'].setValue(
      this.aportacioninmueble.datosconstitucionciudadnotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionemailnotario'].setValue(
      this.aportacioninmueble.datosconstitucionemailnotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnumrpp'].setValue(
      this.aportacioninmueble.datosconstitucionnumrpp
    );
  }

  eliminaAportacioninmueble() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAportacioninmueble = params['id'];
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
        this.aportacioninmuebleService.deleteAportacioninmueble(this.idAportacioninmueble).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Aportacioninmueble item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Aportación del inmueble save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Aportación del inmueble no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Aportación del inmueble deleted unsuccessfully", "error");
      }
    });
  }

  regresaAportacioninmueble() {
    this.location.back();
  }
}
