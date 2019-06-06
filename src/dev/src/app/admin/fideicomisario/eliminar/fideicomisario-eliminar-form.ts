/* PSG  Fideicomisario Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Fideicomisario } from '../fideicomisario.psg.model';
import { FideicomisarioService } from '../fideicomisario.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomisario-eliminar',
  styleUrls: ['../fideicomisario.psg.scss'],
  templateUrl: './fideicomisario-eliminar.psg.html',
})
export class FideicomisarioEliminarForm {
  fideicomisarioForm: FormGroup;
  submitted = false;
  loading = false;
  public fideicomisario: Fideicomisario = new Fideicomisario();
  public idFideicomisario: string;
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
    private fideicomisarioService: FideicomisarioService
  ) {
    this.fideicomisarioForm = this.fb.group({
      numerofideicomisario: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      participante: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      regimenfiscal: new FormControl({ value: '', disabled: true }),
      regimenfiscalItem: new FormControl({ value: '', disabled: true }),
      generalescontroladorfideicomiso: new FormControl({ value: '', disabled: true }),
      generalescontroladorfideicomisoItem: new FormControl({ value: '', disabled: true }),
      generalesnacionalidad: new FormControl({ value: '', disabled: true }),
      generalesnacionalidadItem: new FormControl({ value: '', disabled: true }),
      generalespaisorigen: new FormControl({ value: '', disabled: true }),
      generalespaisorigenItem: new FormControl({ value: '', disabled: true }),
      generalesactividad: new FormControl({ value: '', disabled: true }),
      generalesactividadItem: new FormControl({ value: '', disabled: true }),
      generalesaportarecursos: new FormControl({ value: '', disabled: true }),
      generalesaportarecursosItem: new FormControl({ value: '', disabled: true }),
      generalespaisresidencia: new FormControl({ value: '', disabled: true }),
      generalespaisresidenciaItem: new FormControl({ value: '', disabled: true }),
      generalesclientescotiabank: new FormControl({ value: '', disabled: true }),
      generalesclientescotiabankItem: new FormControl({ value: '', disabled: true }),
      generalespep: new FormControl({ value: '', disabled: true }),
      generalespepItem: new FormControl({ value: '', disabled: true }),
      generalesestatus: new FormControl({ value: '', disabled: true }),
      generalesestatusItem: new FormControl({ value: '', disabled: true }),
      generalesgrupofilial: new FormControl({ value: '', disabled: true }),
      generalescalidadmigratoria: new FormControl({ value: '', disabled: true }),
      generalescalidadmigratoriaItem: new FormControl({ value: '', disabled: true }),
      generaleslugaroperacion: new FormControl({ value: '', disabled: true }),
      generaleslugaroperacionItem: new FormControl({ value: '', disabled: true }),
      generalesoperacuentaterceros: new FormControl({ value: '', disabled: true }),
      generalesoperacuentatercerosItem: new FormControl({ value: '', disabled: true }),
      generalesnivelparticipante: new FormControl({ value: '', disabled: true }),
      generalesnivelparticipanteItem: new FormControl({ value: '', disabled: true }),
      generalesclienterelacionpep: new FormControl({ value: '', disabled: true }),
      generalesclienterelacionpepItem: new FormControl({ value: '', disabled: true }),
      generalesgrado: new FormControl({ value: '', disabled: true }),
      infopldkychonorarios: new FormControl({ value: '', disabled: true }),
      infopldkyccomisiones: new FormControl({ value: '', disabled: true }),
      infopldkyccomisionesItem: new FormControl({ value: '', disabled: true }),
      infopldkycotros: new FormControl({ value: '', disabled: true }),
      infopldkycotrosItem: new FormControl({ value: '', disabled: true }),
      infopldkycsueldos: new FormControl({ value: '', disabled: true }),
      infopldkycsueldosItem: new FormControl({ value: '', disabled: true }),
      infopldkycventa: new FormControl({ value: '', disabled: true }),
      infopldkycventaItem: new FormControl({ value: '', disabled: true }),
      infopldkycinversiones: new FormControl({ value: '', disabled: true }),
      infopldkycinversionesItem: new FormControl({ value: '', disabled: true }),
      infopldkycarrendamiento: new FormControl({ value: '', disabled: true }),
      infopldkycarrendamientoItem: new FormControl({ value: '', disabled: true }),
      infopldkyctipopatrimonio: new FormControl({ value: '', disabled: true }),
      infopldkycinstrumento: new FormControl({ value: '', disabled: true }),
      infopldkycinstrumentoItem: new FormControl({ value: '', disabled: true }),
      infopldkycrazonapertura: new FormControl({ value: '', disabled: true }),
      infopldkyccomentarios: new FormControl({ value: '', disabled: true }),
      infopldkycnivelriesgo: new FormControl({ value: '', disabled: true }),
      infopldkycnivelriesgoItem: new FormControl({ value: '', disabled: true }),
      infopldkycestatuscalculopld: new FormControl({ value: '', disabled: true }),
      infopldkycfechaveriffircosoftAux: new FormControl({ value: '', disabled: true }),
      identificacionrfc: new FormControl({ value: '', disabled: true }),
      identificacioncurp: new FormControl({ value: '', disabled: true }),
      identificacionnoserieefirma: new FormControl({ value: '', disabled: true }),
      identificacionpaisresidfisc1: new FormControl({ value: '', disabled: true }),
      identificacionpaisresidfisc1Item: new FormControl({ value: '', disabled: true }),
      identificacionpaisresidfisc2: new FormControl({ value: '', disabled: true }),
      identificacionpaisresidfisc2Item: new FormControl({ value: '', disabled: true }),
      identificacionemail: new FormControl({ value: '', disabled: true }),
      identificacionfechaconstitucionAux: new FormControl({ value: '', disabled: true }),
      identificacionsexo: new FormControl({ value: '', disabled: true }),
      identificacionsexoItem: new FormControl({ value: '', disabled: true }),
      identificacionpaiscasa: new FormControl({ value: '', disabled: true }),
      identificacionpaiscasaItem: new FormControl({ value: '', disabled: true }),
      identificacionpaisoficina: new FormControl({ value: '', disabled: true }),
      identificacionpaisoficinaItem: new FormControl({ value: '', disabled: true }),
      identificacionpaiscelular: new FormControl({ value: '', disabled: true }),
      identificacionpaiscelularItem: new FormControl({ value: '', disabled: true }),
      identificacionfechainiciorelnegAux: new FormControl({ value: '', disabled: true }),
      identificacionnoidentificacion: new FormControl({ value: '', disabled: true }),
      identificacioncomprobaciondomicilio: new FormControl({ value: '', disabled: true }),
      identificacionactividadempresarial: new FormControl({ value: '', disabled: true }),
      identificacionactividadempresarialItem: new FormControl({ value: '', disabled: true }),
      identificacionnoidentfisc1: new FormControl({ value: '', disabled: true }),
      identificacionnoidentfisc2: new FormControl({ value: '', disabled: true }),
      identificacionclasificacionfatca: new FormControl({ value: '', disabled: true }),
      identificacionladacasa: new FormControl({ value: '', disabled: true }),
      identificacionladaoficina: new FormControl({ value: '', disabled: true }),
      identificacionladacelular: new FormControl({ value: '', disabled: true }),
      identificacionnumerocasa: new FormControl({ value: '', disabled: true }),
      identificacionnumerooficina: new FormControl({ value: '', disabled: true }),
      identificacionnumerocelular: new FormControl({ value: '', disabled: true }),
      identificacionextoficina: new FormControl({ value: '', disabled: true }),
      identificacionextcelular: new FormControl({ value: '', disabled: true }),
      identificacionidentoficialvig: new FormControl({ value: '', disabled: true }),
      identificacionvigencia: new FormControl({ value: '', disabled: true }),
      escrituranoescritura: new FormControl({ value: '', disabled: true }),
      escrituranotario: new FormControl({ value: '', disabled: true }),
      escrituranotarioItem: new FormControl({ value: '', disabled: true }),
      escrituranonotaria: new FormControl({ value: '', disabled: true }),
      escrituraciudad: new FormControl({ value: '', disabled: true }),
      escrituratelefono: new FormControl({ value: '', disabled: true }),
      escrituraemail: new FormControl({ value: '', disabled: true }),
      escriturafechaAux: new FormControl({ value: '', disabled: true }),
      escrituraestado: new FormControl({ value: '', disabled: true }),
      cuentaskycnocuenta1: new FormControl({ value: '', disabled: true }),
      cuentaskyctipocuenta1: new FormControl({ value: '', disabled: true }),
      cuentaskycnocuenta2: new FormControl({ value: '', disabled: true }),
      cuentaskyctipocuenta2: new FormControl({ value: '', disabled: true }),
      cuentaskycnocuenta3: new FormControl({ value: '', disabled: true }),
      cuentaskyctipocuenta3: new FormControl({ value: '', disabled: true }),
      cuentaskycnocuenta4: new FormControl({ value: '', disabled: true }),
      cuentaskyctipocuenta4: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Fideicomisario eliminar()');

    this.recuperaFideicomisario();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaFideicomisario() {
    this.fideicomisario = this.fideicomisarioService.getFideicomisario();
    this.fideicomisarioForm.controls['numerofideicomisario'].setValue(this.fideicomisario.numerofideicomisario);
    this.fideicomisarioForm.controls['tipopersona'].setValue(this.fideicomisario.tipopersona);
    this.fideicomisarioForm.controls['participante'].setValue(this.fideicomisario.participante);
    this.fideicomisarioForm.controls['fideicomisoId'].setValue(this.fideicomisario.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.fideicomisario.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.fideicomisarioForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.fideicomisarioForm.controls['regimenfiscal'].setValue(this.fideicomisario.regimenfiscal);
    this.fideicomisarioForm.controls['generalescontroladorfideicomiso'].setValue(
      this.fideicomisario.generalescontroladorfideicomiso
    );
    this.fideicomisarioForm.controls['generalesnacionalidad'].setValue(this.fideicomisario.generalesnacionalidad);
    this.fideicomisarioForm.controls['generalespaisorigen'].setValue(this.fideicomisario.generalespaisorigen);
    this.fideicomisarioForm.controls['generalesactividad'].setValue(this.fideicomisario.generalesactividad);
    this.fideicomisarioForm.controls['generalesaportarecursos'].setValue(this.fideicomisario.generalesaportarecursos);
    this.fideicomisarioForm.controls['generalespaisresidencia'].setValue(this.fideicomisario.generalespaisresidencia);
    this.fideicomisarioForm.controls['generalesclientescotiabank'].setValue(
      this.fideicomisario.generalesclientescotiabank
    );
    this.fideicomisarioForm.controls['generalespep'].setValue(this.fideicomisario.generalespep);
    this.fideicomisarioForm.controls['generalesestatus'].setValue(this.fideicomisario.generalesestatus);
    this.fideicomisarioForm.controls['generalesgrupofilial'].setValue(this.fideicomisario.generalesgrupofilial);
    this.fideicomisarioForm.controls['generalescalidadmigratoria'].setValue(
      this.fideicomisario.generalescalidadmigratoria
    );
    this.fideicomisarioForm.controls['generaleslugaroperacion'].setValue(this.fideicomisario.generaleslugaroperacion);
    this.fideicomisarioForm.controls['generalesoperacuentaterceros'].setValue(
      this.fideicomisario.generalesoperacuentaterceros
    );
    this.fideicomisarioForm.controls['generalesnivelparticipante'].setValue(
      this.fideicomisario.generalesnivelparticipante
    );
    this.fideicomisarioForm.controls['generalesclienterelacionpep'].setValue(
      this.fideicomisario.generalesclienterelacionpep
    );
    this.fideicomisarioForm.controls['generalesgrado'].setValue(this.fideicomisario.generalesgrado);
    this.fideicomisarioForm.controls['infopldkychonorarios'].setValue(this.fideicomisario.infopldkychonorarios);
    this.fideicomisarioForm.controls['infopldkyccomisiones'].setValue(this.fideicomisario.infopldkyccomisiones);
    this.fideicomisarioForm.controls['infopldkycotros'].setValue(this.fideicomisario.infopldkycotros);
    this.fideicomisarioForm.controls['infopldkycsueldos'].setValue(this.fideicomisario.infopldkycsueldos);
    this.fideicomisarioForm.controls['infopldkycventa'].setValue(this.fideicomisario.infopldkycventa);
    this.fideicomisarioForm.controls['infopldkycinversiones'].setValue(this.fideicomisario.infopldkycinversiones);
    this.fideicomisarioForm.controls['infopldkycarrendamiento'].setValue(this.fideicomisario.infopldkycarrendamiento);
    this.fideicomisarioForm.controls['infopldkyctipopatrimonio'].setValue(this.fideicomisario.infopldkyctipopatrimonio);
    this.fideicomisarioForm.controls['infopldkycinstrumento'].setValue(this.fideicomisario.infopldkycinstrumento);
    this.fideicomisarioForm.controls['infopldkycrazonapertura'].setValue(this.fideicomisario.infopldkycrazonapertura);
    this.fideicomisarioForm.controls['infopldkyccomentarios'].setValue(this.fideicomisario.infopldkyccomentarios);
    this.fideicomisarioForm.controls['infopldkycnivelriesgo'].setValue(this.fideicomisario.infopldkycnivelriesgo);
    this.fideicomisarioForm.controls['infopldkycestatuscalculopld'].setValue(
      this.fideicomisario.infopldkycestatuscalculopld
    );
    this.fideicomisarioForm.controls['infopldkycfechaveriffircosoftAux'].setValue(
      this.datePipe.transform(this.fideicomisario.infopldkycfechaveriffircosoft, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['identificacionrfc'].setValue(this.fideicomisario.identificacionrfc);
    this.fideicomisarioForm.controls['identificacioncurp'].setValue(this.fideicomisario.identificacioncurp);
    this.fideicomisarioForm.controls['identificacionnoserieefirma'].setValue(
      this.fideicomisario.identificacionnoserieefirma
    );
    this.fideicomisarioForm.controls['identificacionpaisresidfisc1'].setValue(
      this.fideicomisario.identificacionpaisresidfisc1
    );
    this.fideicomisarioForm.controls['identificacionpaisresidfisc2'].setValue(
      this.fideicomisario.identificacionpaisresidfisc2
    );
    this.fideicomisarioForm.controls['identificacionemail'].setValue(this.fideicomisario.identificacionemail);
    this.fideicomisarioForm.controls['identificacionfechaconstitucionAux'].setValue(
      this.datePipe.transform(this.fideicomisario.identificacionfechaconstitucion, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['identificacionsexo'].setValue(this.fideicomisario.identificacionsexo);
    this.fideicomisarioForm.controls['identificacionpaiscasa'].setValue(this.fideicomisario.identificacionpaiscasa);
    this.fideicomisarioForm.controls['identificacionpaisoficina'].setValue(
      this.fideicomisario.identificacionpaisoficina
    );
    this.fideicomisarioForm.controls['identificacionpaiscelular'].setValue(
      this.fideicomisario.identificacionpaiscelular
    );
    this.fideicomisarioForm.controls['identificacionfechainiciorelnegAux'].setValue(
      this.datePipe.transform(this.fideicomisario.identificacionfechainiciorelneg, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['identificacionnoidentificacion'].setValue(
      this.fideicomisario.identificacionnoidentificacion
    );
    this.fideicomisarioForm.controls['identificacioncomprobaciondomicilio'].setValue(
      this.fideicomisario.identificacioncomprobaciondomicilio
    );
    this.fideicomisarioForm.controls['identificacionactividadempresarial'].setValue(
      this.fideicomisario.identificacionactividadempresarial
    );
    this.fideicomisarioForm.controls['identificacionnoidentfisc1'].setValue(
      this.fideicomisario.identificacionnoidentfisc1
    );
    this.fideicomisarioForm.controls['identificacionnoidentfisc2'].setValue(
      this.fideicomisario.identificacionnoidentfisc2
    );
    this.fideicomisarioForm.controls['identificacionclasificacionfatca'].setValue(
      this.fideicomisario.identificacionclasificacionfatca
    );
    this.fideicomisarioForm.controls['identificacionladacasa'].setValue(this.fideicomisario.identificacionladacasa);
    this.fideicomisarioForm.controls['identificacionladaoficina'].setValue(
      this.fideicomisario.identificacionladaoficina
    );
    this.fideicomisarioForm.controls['identificacionladacelular'].setValue(
      this.fideicomisario.identificacionladacelular
    );
    this.fideicomisarioForm.controls['identificacionnumerocasa'].setValue(this.fideicomisario.identificacionnumerocasa);
    this.fideicomisarioForm.controls['identificacionnumerooficina'].setValue(
      this.fideicomisario.identificacionnumerooficina
    );
    this.fideicomisarioForm.controls['identificacionnumerocelular'].setValue(
      this.fideicomisario.identificacionnumerocelular
    );
    this.fideicomisarioForm.controls['identificacionextoficina'].setValue(this.fideicomisario.identificacionextoficina);
    this.fideicomisarioForm.controls['identificacionextcelular'].setValue(this.fideicomisario.identificacionextcelular);
    this.fideicomisarioForm.controls['identificacionidentoficialvig'].setValue(
      this.fideicomisario.identificacionidentoficialvig
    );
    this.fideicomisarioForm.controls['identificacionvigencia'].setValue(this.fideicomisario.identificacionvigencia);
    this.fideicomisarioForm.controls['escrituranoescritura'].setValue(this.fideicomisario.escrituranoescritura);
    this.fideicomisarioForm.controls['escrituranotario'].setValue(this.fideicomisario.escrituranotario);
    this.fideicomisarioForm.controls['escrituranonotaria'].setValue(this.fideicomisario.escrituranonotaria);
    this.fideicomisarioForm.controls['escrituraciudad'].setValue(this.fideicomisario.escrituraciudad);
    this.fideicomisarioForm.controls['escrituratelefono'].setValue(this.fideicomisario.escrituratelefono);
    this.fideicomisarioForm.controls['escrituraemail'].setValue(this.fideicomisario.escrituraemail);
    this.fideicomisarioForm.controls['escriturafechaAux'].setValue(
      this.datePipe.transform(this.fideicomisario.escriturafecha, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['escrituraestado'].setValue(this.fideicomisario.escrituraestado);
    this.fideicomisarioForm.controls['cuentaskycnocuenta1'].setValue(this.fideicomisario.cuentaskycnocuenta1);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta1'].setValue(this.fideicomisario.cuentaskyctipocuenta1);
    this.fideicomisarioForm.controls['cuentaskycnocuenta2'].setValue(this.fideicomisario.cuentaskycnocuenta2);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta2'].setValue(this.fideicomisario.cuentaskyctipocuenta2);
    this.fideicomisarioForm.controls['cuentaskycnocuenta3'].setValue(this.fideicomisario.cuentaskycnocuenta3);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta3'].setValue(this.fideicomisario.cuentaskyctipocuenta3);
    this.fideicomisarioForm.controls['cuentaskycnocuenta4'].setValue(this.fideicomisario.cuentaskycnocuenta4);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta4'].setValue(this.fideicomisario.cuentaskyctipocuenta4);
  }

  eliminaFideicomisario() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idFideicomisario = params['id'];
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
        this.fideicomisarioService.deleteFideicomisario(this.idFideicomisario).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Fideicomisario item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Fideicomisario save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Fideicomisario no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Fideicomisario deleted unsuccessfully", "error");
      }
    });
  }

  regresaFideicomisario() {
    this.location.back();
  }
}
