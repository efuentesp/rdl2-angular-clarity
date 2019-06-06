/* PSG  Fideicomitente Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Fideicomitente } from '../fideicomitente.psg.model';
import { FideicomitenteService } from '../fideicomitente.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomitente-eliminar',
  styleUrls: ['../fideicomitente.psg.scss'],
  templateUrl: './fideicomitente-eliminar.psg.html',
})
export class FideicomitenteEliminarForm {
  fideicomitenteForm: FormGroup;
  submitted = false;
  loading = false;
  public fideicomitente: Fideicomitente = new Fideicomitente();
  public idFideicomitente: string;
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
    private fideicomitenteService: FideicomitenteService
  ) {
    this.fideicomitenteForm = this.fb.group({
      numerofideicomitente: new FormControl({ value: '', disabled: true }),
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
    console.log('Fideicomitente eliminar()');

    this.recuperaFideicomitente();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaFideicomitente() {
    this.fideicomitente = this.fideicomitenteService.getFideicomitente();
    this.fideicomitenteForm.controls['numerofideicomitente'].setValue(this.fideicomitente.numerofideicomitente);
    this.fideicomitenteForm.controls['tipopersona'].setValue(this.fideicomitente.tipopersona);
    this.fideicomitenteForm.controls['participante'].setValue(this.fideicomitente.participante);
    this.fideicomitenteForm.controls['fideicomisoId'].setValue(this.fideicomitente.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.fideicomitente.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.fideicomitenteForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.fideicomitenteForm.controls['regimenfiscal'].setValue(this.fideicomitente.regimenfiscal);
    this.fideicomitenteForm.controls['generalescontroladorfideicomiso'].setValue(
      this.fideicomitente.generalescontroladorfideicomiso
    );
    this.fideicomitenteForm.controls['generalesnacionalidad'].setValue(this.fideicomitente.generalesnacionalidad);
    this.fideicomitenteForm.controls['generalespaisorigen'].setValue(this.fideicomitente.generalespaisorigen);
    this.fideicomitenteForm.controls['generalesactividad'].setValue(this.fideicomitente.generalesactividad);
    this.fideicomitenteForm.controls['generalesaportarecursos'].setValue(this.fideicomitente.generalesaportarecursos);
    this.fideicomitenteForm.controls['generalespaisresidencia'].setValue(this.fideicomitente.generalespaisresidencia);
    this.fideicomitenteForm.controls['generalesclientescotiabank'].setValue(
      this.fideicomitente.generalesclientescotiabank
    );
    this.fideicomitenteForm.controls['generalespep'].setValue(this.fideicomitente.generalespep);
    this.fideicomitenteForm.controls['generalesestatus'].setValue(this.fideicomitente.generalesestatus);
    this.fideicomitenteForm.controls['generalesgrupofilial'].setValue(this.fideicomitente.generalesgrupofilial);
    this.fideicomitenteForm.controls['generalescalidadmigratoria'].setValue(
      this.fideicomitente.generalescalidadmigratoria
    );
    this.fideicomitenteForm.controls['generaleslugaroperacion'].setValue(this.fideicomitente.generaleslugaroperacion);
    this.fideicomitenteForm.controls['generalesoperacuentaterceros'].setValue(
      this.fideicomitente.generalesoperacuentaterceros
    );
    this.fideicomitenteForm.controls['generalesnivelparticipante'].setValue(
      this.fideicomitente.generalesnivelparticipante
    );
    this.fideicomitenteForm.controls['generalesclienterelacionpep'].setValue(
      this.fideicomitente.generalesclienterelacionpep
    );
    this.fideicomitenteForm.controls['generalesgrado'].setValue(this.fideicomitente.generalesgrado);
    this.fideicomitenteForm.controls['infopldkychonorarios'].setValue(this.fideicomitente.infopldkychonorarios);
    this.fideicomitenteForm.controls['infopldkyccomisiones'].setValue(this.fideicomitente.infopldkyccomisiones);
    this.fideicomitenteForm.controls['infopldkycotros'].setValue(this.fideicomitente.infopldkycotros);
    this.fideicomitenteForm.controls['infopldkycsueldos'].setValue(this.fideicomitente.infopldkycsueldos);
    this.fideicomitenteForm.controls['infopldkycventa'].setValue(this.fideicomitente.infopldkycventa);
    this.fideicomitenteForm.controls['infopldkycinversiones'].setValue(this.fideicomitente.infopldkycinversiones);
    this.fideicomitenteForm.controls['infopldkycarrendamiento'].setValue(this.fideicomitente.infopldkycarrendamiento);
    this.fideicomitenteForm.controls['infopldkyctipopatrimonio'].setValue(this.fideicomitente.infopldkyctipopatrimonio);
    this.fideicomitenteForm.controls['infopldkycinstrumento'].setValue(this.fideicomitente.infopldkycinstrumento);
    this.fideicomitenteForm.controls['infopldkycrazonapertura'].setValue(this.fideicomitente.infopldkycrazonapertura);
    this.fideicomitenteForm.controls['infopldkyccomentarios'].setValue(this.fideicomitente.infopldkyccomentarios);
    this.fideicomitenteForm.controls['infopldkycnivelriesgo'].setValue(this.fideicomitente.infopldkycnivelriesgo);
    this.fideicomitenteForm.controls['infopldkycestatuscalculopld'].setValue(
      this.fideicomitente.infopldkycestatuscalculopld
    );
    this.fideicomitenteForm.controls['infopldkycfechaveriffircosoftAux'].setValue(
      this.datePipe.transform(this.fideicomitente.infopldkycfechaveriffircosoft, 'dd/MM/yyyy')
    );
    this.fideicomitenteForm.controls['identificacionrfc'].setValue(this.fideicomitente.identificacionrfc);
    this.fideicomitenteForm.controls['identificacioncurp'].setValue(this.fideicomitente.identificacioncurp);
    this.fideicomitenteForm.controls['identificacionnoserieefirma'].setValue(
      this.fideicomitente.identificacionnoserieefirma
    );
    this.fideicomitenteForm.controls['identificacionpaisresidfisc1'].setValue(
      this.fideicomitente.identificacionpaisresidfisc1
    );
    this.fideicomitenteForm.controls['identificacionpaisresidfisc2'].setValue(
      this.fideicomitente.identificacionpaisresidfisc2
    );
    this.fideicomitenteForm.controls['identificacionemail'].setValue(this.fideicomitente.identificacionemail);
    this.fideicomitenteForm.controls['identificacionfechaconstitucionAux'].setValue(
      this.datePipe.transform(this.fideicomitente.identificacionfechaconstitucion, 'dd/MM/yyyy')
    );
    this.fideicomitenteForm.controls['identificacionsexo'].setValue(this.fideicomitente.identificacionsexo);
    this.fideicomitenteForm.controls['identificacionpaiscasa'].setValue(this.fideicomitente.identificacionpaiscasa);
    this.fideicomitenteForm.controls['identificacionpaisoficina'].setValue(
      this.fideicomitente.identificacionpaisoficina
    );
    this.fideicomitenteForm.controls['identificacionpaiscelular'].setValue(
      this.fideicomitente.identificacionpaiscelular
    );
    this.fideicomitenteForm.controls['identificacionfechainiciorelnegAux'].setValue(
      this.datePipe.transform(this.fideicomitente.identificacionfechainiciorelneg, 'dd/MM/yyyy')
    );
    this.fideicomitenteForm.controls['identificacionnoidentificacion'].setValue(
      this.fideicomitente.identificacionnoidentificacion
    );
    this.fideicomitenteForm.controls['identificacioncomprobaciondomicilio'].setValue(
      this.fideicomitente.identificacioncomprobaciondomicilio
    );
    this.fideicomitenteForm.controls['identificacionactividadempresarial'].setValue(
      this.fideicomitente.identificacionactividadempresarial
    );
    this.fideicomitenteForm.controls['identificacionnoidentfisc1'].setValue(
      this.fideicomitente.identificacionnoidentfisc1
    );
    this.fideicomitenteForm.controls['identificacionnoidentfisc2'].setValue(
      this.fideicomitente.identificacionnoidentfisc2
    );
    this.fideicomitenteForm.controls['identificacionclasificacionfatca'].setValue(
      this.fideicomitente.identificacionclasificacionfatca
    );
    this.fideicomitenteForm.controls['identificacionladacasa'].setValue(this.fideicomitente.identificacionladacasa);
    this.fideicomitenteForm.controls['identificacionladaoficina'].setValue(
      this.fideicomitente.identificacionladaoficina
    );
    this.fideicomitenteForm.controls['identificacionladacelular'].setValue(
      this.fideicomitente.identificacionladacelular
    );
    this.fideicomitenteForm.controls['identificacionnumerocasa'].setValue(this.fideicomitente.identificacionnumerocasa);
    this.fideicomitenteForm.controls['identificacionnumerooficina'].setValue(
      this.fideicomitente.identificacionnumerooficina
    );
    this.fideicomitenteForm.controls['identificacionnumerocelular'].setValue(
      this.fideicomitente.identificacionnumerocelular
    );
    this.fideicomitenteForm.controls['identificacionextoficina'].setValue(this.fideicomitente.identificacionextoficina);
    this.fideicomitenteForm.controls['identificacionextcelular'].setValue(this.fideicomitente.identificacionextcelular);
    this.fideicomitenteForm.controls['identificacionidentoficialvig'].setValue(
      this.fideicomitente.identificacionidentoficialvig
    );
    this.fideicomitenteForm.controls['identificacionvigencia'].setValue(this.fideicomitente.identificacionvigencia);
    this.fideicomitenteForm.controls['escrituranoescritura'].setValue(this.fideicomitente.escrituranoescritura);
    this.fideicomitenteForm.controls['escrituranotario'].setValue(this.fideicomitente.escrituranotario);
    this.fideicomitenteForm.controls['escrituranonotaria'].setValue(this.fideicomitente.escrituranonotaria);
    this.fideicomitenteForm.controls['escrituraciudad'].setValue(this.fideicomitente.escrituraciudad);
    this.fideicomitenteForm.controls['escrituratelefono'].setValue(this.fideicomitente.escrituratelefono);
    this.fideicomitenteForm.controls['escrituraemail'].setValue(this.fideicomitente.escrituraemail);
    this.fideicomitenteForm.controls['escriturafechaAux'].setValue(
      this.datePipe.transform(this.fideicomitente.escriturafecha, 'dd/MM/yyyy')
    );
    this.fideicomitenteForm.controls['escrituraestado'].setValue(this.fideicomitente.escrituraestado);
    this.fideicomitenteForm.controls['cuentaskycnocuenta1'].setValue(this.fideicomitente.cuentaskycnocuenta1);
    this.fideicomitenteForm.controls['cuentaskyctipocuenta1'].setValue(this.fideicomitente.cuentaskyctipocuenta1);
    this.fideicomitenteForm.controls['cuentaskycnocuenta2'].setValue(this.fideicomitente.cuentaskycnocuenta2);
    this.fideicomitenteForm.controls['cuentaskyctipocuenta2'].setValue(this.fideicomitente.cuentaskyctipocuenta2);
    this.fideicomitenteForm.controls['cuentaskycnocuenta3'].setValue(this.fideicomitente.cuentaskycnocuenta3);
    this.fideicomitenteForm.controls['cuentaskyctipocuenta3'].setValue(this.fideicomitente.cuentaskyctipocuenta3);
    this.fideicomitenteForm.controls['cuentaskycnocuenta4'].setValue(this.fideicomitente.cuentaskycnocuenta4);
    this.fideicomitenteForm.controls['cuentaskyctipocuenta4'].setValue(this.fideicomitente.cuentaskyctipocuenta4);
  }

  eliminaFideicomitente() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idFideicomitente = params['id'];
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
        this.fideicomitenteService.deleteFideicomitente(this.idFideicomitente).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Fideicomitente item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Fideicomitente save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Fideicomitente no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Fideicomitente deleted unsuccessfully", "error");
      }
    });
  }

  regresaFideicomitente() {
    this.location.back();
  }
}
