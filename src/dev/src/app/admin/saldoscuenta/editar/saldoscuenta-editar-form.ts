/* PSG  Saldoscuenta Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Saldoscuenta } from '../saldoscuenta.psg.model';
import { SaldoscuentaSend } from '../saldoscuenta.psg.model-send';
import { SaldoscuentaService } from '../saldoscuenta.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-saldoscuenta-editar',
  styleUrls: ['../saldoscuenta.psg.scss'],
  templateUrl: './saldoscuenta-editar.psg.html',
})
export class SaldoscuentaEditarForm implements OnInit {
  public saldoscuentaForm: FormGroup;
  public submitted = false;
  public loading = false;
  public saldoscuenta: Saldoscuenta = new Saldoscuenta();
  public saldoscuentaSend: SaldoscuentaSend = new SaldoscuentaSend();
  public idSaldoscuenta: string;
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
    private saldoscuentaService: SaldoscuentaService
  ) {
    this.saldoscuentaForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      subfisoId: new FormControl('', Validators.required),
      subfisoItem: new FormControl(''),
      cuenta: new FormControl('', Validators.required),
      sct: new FormControl('', Validators.required),
      ssct: new FormControl('', Validators.required),
      sssct: new FormControl('', Validators.required),
      ssssct: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      auxiliar1: new FormControl('', Validators.required),
      auxiliar2: new FormControl('', Validators.required),
      auxiliar3: new FormControl(''),
      saldoinicial: new FormControl('', Validators.required),
      cargos: new FormControl('', Validators.required),
      abonos: new FormControl('', Validators.required),
      saldoactual: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaSaldoscuenta();

    this.cargaFideicomiso();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaSaldoscuenta() {
    this.saldoscuenta = this.saldoscuentaService.getSaldoscuenta();
    this.saldoscuentaForm.controls['fideicomisoId'].setValue(this.saldoscuenta.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.saldoscuenta.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.saldoscuentaForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.saldoscuentaForm.controls['subfisoId'].setValue(this.saldoscuenta.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.saldoscuenta.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.saldoscuentaForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });

    this.saldoscuentaForm.controls['cuenta'].setValue(this.saldoscuenta.cuenta);
    this.saldoscuentaForm.controls['sct'].setValue(this.saldoscuenta.sct);
    this.saldoscuentaForm.controls['ssct'].setValue(this.saldoscuenta.ssct);
    this.saldoscuentaForm.controls['sssct'].setValue(this.saldoscuenta.sssct);
    this.saldoscuentaForm.controls['ssssct'].setValue(this.saldoscuenta.ssssct);
    this.saldoscuentaForm.controls['moneda'].setValue(this.saldoscuenta.moneda);
    this.saldoscuentaForm.controls['auxiliar1'].setValue(this.saldoscuenta.auxiliar1);
    this.saldoscuentaForm.controls['auxiliar2'].setValue(this.saldoscuenta.auxiliar2);
    this.saldoscuentaForm.controls['auxiliar3'].setValue(this.saldoscuenta.auxiliar3);
    this.saldoscuentaForm.controls['saldoinicial'].setValue(this.saldoscuenta.saldoinicial);
    this.saldoscuentaForm.controls['cargos'].setValue(this.saldoscuenta.cargos);
    this.saldoscuentaForm.controls['abonos'].setValue(this.saldoscuenta.abonos);
    this.saldoscuentaForm.controls['saldoactual'].setValue(this.saldoscuenta.saldoactual);
  }

  editaSaldoscuenta() {
    this.submitted = true;

    if (this.saldoscuentaForm.invalid) {
      swal('Error...', 'Saldos por cuenta has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idSaldoscuenta = params['id'];
      });

      this.saldoscuentaSend.fideicomisoId = this.saldoscuentaForm.controls['fideicomisoId'].value;
      this.saldoscuentaSend.subfisoId = this.saldoscuentaForm.controls['subfisoId'].value;
      this.saldoscuentaSend.cuenta = this.saldoscuentaForm.controls['cuenta'].value;
      this.saldoscuentaSend.sct = this.saldoscuentaForm.controls['sct'].value;
      this.saldoscuentaSend.ssct = this.saldoscuentaForm.controls['ssct'].value;
      this.saldoscuentaSend.sssct = this.saldoscuentaForm.controls['sssct'].value;
      this.saldoscuentaSend.ssssct = this.saldoscuentaForm.controls['ssssct'].value;
      this.saldoscuentaSend.moneda = this.saldoscuentaForm.controls['moneda'].value;
      this.saldoscuentaSend.auxiliar1 = this.saldoscuentaForm.controls['auxiliar1'].value;
      this.saldoscuentaSend.auxiliar2 = this.saldoscuentaForm.controls['auxiliar2'].value;
      this.saldoscuentaSend.auxiliar3 = this.saldoscuentaForm.controls['auxiliar3'].value;
      this.saldoscuentaSend.saldoinicial = this.saldoscuentaForm.controls['saldoinicial'].value;
      this.saldoscuentaSend.cargos = this.saldoscuentaForm.controls['cargos'].value;
      this.saldoscuentaSend.abonos = this.saldoscuentaForm.controls['abonos'].value;
      this.saldoscuentaSend.saldoactual = this.saldoscuentaForm.controls['saldoactual'].value;

      this.saldoscuentaService.updateEditaSaldoscuenta(this.saldoscuentaSend, this.idSaldoscuenta).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Saldos por cuenta save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Saldos por cuenta has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Saldos por cuenta save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaFideicomiso() {
    this.fideicomisoService.getRecuperaFideicomiso().subscribe(
      res => {
        if (res) {
          this.fideicomisoArray = res.json();

          this.fideicomisoArray.forEach(element => {
            if (element.generalesadministrador == 'ADMIN1002') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1002';
            }
            if (element.generalesadministrador == 'ADMIN1003') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1003';
            }
            if (element.generalesadministrador == 'ADMIN1004') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1004';
            }
            if (element.generalesadministrador == 'ADMIN1005') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1005';
            }
            if (element.generalesadministrador == 'ADMIN1006') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1006';
            }
            if (element.generalespromotor == 'PROMOTOR1002') {
              element.generalespromotorItem = 'PROMOTOR 1002';
            }
            if (element.generalespromotor == 'PROMOTOR1003') {
              element.generalespromotorItem = 'PROMOTOR 1003';
            }
            if (element.generalespromotor == 'PROMOTOR1004') {
              element.generalespromotorItem = 'PROMOTOR 1004';
            }
            if (element.generalespromotor == 'PROMOTOR1005') {
              element.generalespromotorItem = 'PROMOTOR 1005';
            }
            if (element.generalespromotor == 'PROMOTOR1006') {
              element.generalespromotorItem = 'PROMOTOR 1006';
            }
            if (element.caracteristicasformamanejo == 'DISCRESTR') {
              element.caracteristicasformamanejoItem = 'DISCRECIONAL RESTRINGIDO';
            }
            if (element.caracteristicasformamanejo == 'NODISCR') {
              element.caracteristicasformamanejoItem = 'NO DISCRECIONAL';
            }
            if (element.caracteristicasformamanejo == 'SINMANEJO') {
              element.caracteristicasformamanejoItem = 'SIN MANEJO DE INVERSION';
            }
            if (element.caracteristicastiponegocio == 'TIPO1') {
              element.caracteristicastiponegocioItem = 'FIDEICOMISO';
            }
            if (element.caracteristicastiponegocio == 'TIPO2') {
              element.caracteristicastiponegocioItem = 'MANDATO';
            }
            if (element.caracteristicastiponegocio == 'TIPO3') {
              element.caracteristicastiponegocioItem = 'COMISIÓN MERCANTIL';
            }
            if (element.caracteristicastiponegocio == 'TIPO4') {
              element.caracteristicastiponegocioItem = 'DEPÓSITO CONDICIONAL';
            }
            if (element.caracteristicastiponegocio == 'TIPO5') {
              element.caracteristicastiponegocioItem = 'REPRESENTACIÓN COMÚN';
            }
            if (element.caracteristicasproducto == 'PROD1') {
              element.caracteristicasproductoItem = 'PLANEACIÓN PATRIMONIAL TESTAMENTARIA';
            }
            if (element.caracteristicasproducto == 'PROD2') {
              element.caracteristicasproductoItem = 'ADMINISTRACIÓN DE RECURSOS';
            }
            if (element.caracteristicasproducto == 'PROD3') {
              element.caracteristicasproductoItem = 'GARANTÍA';
            }
            if (element.caracteristicasproducto == 'PROD4') {
              element.caracteristicasproductoItem = 'FUENTE DE PAGO';
            }
            if (element.caracteristicasproducto == 'PROD5') {
              element.caracteristicasproductoItem = 'ZONA RESTRINGIDA';
            }
            if (element.caracteristicasproducto == 'PROD6') {
              element.caracteristicasproductoItem = 'MANDATO';
            }
            if (element.caracteristicasproducto == 'PROD7') {
              element.caracteristicasproductoItem = 'PENSIONES Y JUBILACIONES';
            }
            if (element.caracteristicasproducto == 'PROD8') {
              element.caracteristicasproductoItem = 'DESARROLLO INMOBILIARIO';
            }
            if (element.caracteristicasproducto == 'PROD9') {
              element.caracteristicasproductoItem = 'INFRAESTRUCTURA';
            }
            if (element.caracteristicasproducto == 'PROD10') {
              element.caracteristicasproductoItem = 'REPRESENTACIÓN COMÚN';
            }
            if (element.caracteristicasproducto == 'PROD11') {
              element.caracteristicasproductoItem = 'DEPÓSITO CONDICIONAL (Escrow)';
            }
            if (element.caracteristicasvalfatca == 'NO') {
              element.caracteristicasvalfatcaItem = 'NO';
            }
            if (element.caracteristicasvalfatca == 'SI') {
              element.caracteristicasvalfatcaItem = 'SI';
            }
            if (element.caracteristicasmanejosubfisos == 'NO') {
              element.caracteristicasmanejosubfisosItem = 'NO';
            }
            if (element.caracteristicasmanejosubfisos == 'SI') {
              element.caracteristicasmanejosubfisosItem = 'SI';
            }
            if (element.caracteristicassujetoart151 == 'NO') {
              element.caracteristicassujetoart151Item = 'NO';
            }
            if (element.caracteristicassujetoart151 == 'SI') {
              element.caracteristicassujetoart151Item = 'SI';
            }
            if (element.caracteristicascerrado == 'NO') {
              element.caracteristicascerradoItem = 'NO';
            }
            if (element.caracteristicascerrado == 'SI') {
              element.caracteristicascerradoItem = 'SI';
            }
            if (element.caracteristicasrevocable == 'NO') {
              element.caracteristicasrevocableItem = 'NO';
            }
            if (element.caracteristicasrevocable == 'SI') {
              element.caracteristicasrevocableItem = 'SI';
            }
            if (element.caracteristicasescontratoeje == 'NO') {
              element.caracteristicasescontratoejeItem = 'NO';
            }
            if (element.caracteristicasescontratoeje == 'SI') {
              element.caracteristicasescontratoejeItem = 'SI';
            }
            if (element.caracteristicascomitetecnico == 'NO') {
              element.caracteristicascomitetecnicoItem = 'NO';
            }
            if (element.caracteristicascomitetecnico == 'SI') {
              element.caracteristicascomitetecnicoItem = 'SI';
            }
            if (element.caracteristicasmanejamonext == 'NO') {
              element.caracteristicasmanejamonextItem = 'NO';
            }
            if (element.caracteristicasmanejamonext == 'SI') {
              element.caracteristicasmanejamonextItem = 'SI';
            }
            if (element.caracteristicasivafronterizo == 'NO') {
              element.caracteristicasivafronterizoItem = 'NO';
            }
            if (element.caracteristicasivafronterizo == 'SI') {
              element.caracteristicasivafronterizoItem = 'SI';
            }
            element.caracteristicasfechaaltaAux = new Date(element.caracteristicasfechaalta);
            element.caracteristicasfechaconstitucionAux = new Date(element.caracteristicasfechaconstitucion);
            element.caracteristicasfechaaprobacionAux = new Date(element.caracteristicasfechaaprobacion);
            if (element.caracteristicasestado == 'ACTIVO') {
              element.caracteristicasestadoItem = 'ACTIVO';
            }
            if (element.caracteristicasestado == 'CANCELADO') {
              element.caracteristicasestadoItem = 'CANCELADO';
            }
            if (element.caracteristicasestado == 'CONSTITUIDO') {
              element.caracteristicasestadoItem = 'CONSTITUIDO';
            }
            if (element.caracteristicasestado == 'ENVRESULTADOS') {
              element.caracteristicasestadoItem = 'ENV. A RESULTADOS';
            }
            if (element.caracteristicasestado == 'SUSPENDIDO') {
              element.caracteristicasestadoItem = 'SUSPENDIDO';
            }
            if (element.caracteristicasestado == 'ANTEPROYECTO') {
              element.caracteristicasestadoItem = 'ANTEPROYECTO';
            }
            if (element.adicionalestipo == 'PUBLICO') {
              element.adicionalestipoItem = 'PUBLICO';
            }
            if (element.adicionalestipo == 'PRIVADO') {
              element.adicionalestipoItem = 'PRIVADO';
            }
            if (element.adicionalestipopersona == 'FISICA') {
              element.adicionalestipopersonaItem = 'FISICA';
            }
            if (element.adicionalestipopersona == 'GOBIERNO') {
              element.adicionalestipopersonaItem = 'GOBIERNO';
            }
            if (element.adicionalestipopersona == 'MORAL') {
              element.adicionalestipopersonaItem = 'MORAL';
            }
            if (element.adicionalesconactividadempresarial == 'NO') {
              element.adicionalesconactividadempresarialItem = 'NO';
            }
            if (element.adicionalesconactividadempresarial == 'SI') {
              element.adicionalesconactividadempresarialItem = 'SI';
            }
            element.adicionalesfechapermisosreAux = new Date(element.adicionalesfechapermisosre);
            if (element.adicionalesprovsustfiduciaria == 'NO') {
              element.adicionalesprovsustfiduciariaItem = 'NO';
            }
            if (element.adicionalesprovsustfiduciaria == 'SI') {
              element.adicionalesprovsustfiduciariaItem = 'SI';
            }
            if (element.adicionalesfondosinterfaseafore == 'NO') {
              element.adicionalesfondosinterfaseaforeItem = 'NO';
            }
            if (element.adicionalesfondosinterfaseafore == 'SI') {
              element.adicionalesfondosinterfaseaforeItem = 'SI';
            }
            element.adicionalesfechainscripcionAux = new Date(element.adicionalesfechainscripcion);
            if (element.adicionalesformalizacioncontrato == 'PRIVADO') {
              element.adicionalesformalizacioncontratoItem = 'Contrato Privado';
            }
            if (element.adicionalesformalizacioncontrato == 'ESCPUB') {
              element.adicionalesformalizacioncontratoItem = 'Escritura Pública';
            }
            element.adicionalesfechaescrituraAux = new Date(element.adicionalesfechaescritura);
            if (element.adicionalesnombrenotario == 'NOTARIO01') {
              element.adicionalesnombrenotarioItem = 'NOTARIO 01';
            }
            if (element.adicionalesnombrenotario == 'NOTARIO02') {
              element.adicionalesnombrenotarioItem = 'NOTARIO 02';
            }
            if (element.adicionalesnombrenotario == 'NOTARIO03') {
              element.adicionalesnombrenotarioItem = 'NOTARIO 03';
            }
            element.adicionalesfechainscripcionregpublicoAux = new Date(element.adicionalesfechainscripcionregpublico);
            if (element.adicionalesadministracion == 'DELEGADA') {
              element.adicionalesadministracionItem = 'ADMINISTRACION DELEGADA';
            }
            if (element.adicionalesadministracion == 'FIDUCIARIA') {
              element.adicionalesadministracionItem = 'ADMINISTRACION FIDUCIARIA';
            }
            if (element.adicionalescontabilidaddelegada == 'NO') {
              element.adicionalescontabilidaddelegadaItem = 'NO';
            }
            if (element.adicionalescontabilidaddelegada == 'SI') {
              element.adicionalescontabilidaddelegadaItem = 'SI';
            }
          });
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Prospecto.', 'error');
      }
    );
  }

  setClickedRowFideicomiso(index, fideicomiso) {
    fideicomiso.checked = !fideicomiso.checked;
    if (fideicomiso.checked) {
      this.fideicomisoService.setFideicomiso(fideicomiso);

      this.saldoscuentaForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.saldoscuentaForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.saldoscuentaForm.controls['fideicomisoId'].setValue(null);
      this.saldoscuentaForm.controls['fideicomisoItem'].setValue('');
    }
  }
  cargaSubfiso() {
    this.subfisoService.getRecuperaSubfiso().subscribe(
      res => {
        if (res) {
          this.subfisoArray = res.json();

          this.subfisoArray.forEach(element => {
            if (element.estatus == 'ACTIVO') {
              element.estatusItem = 'ACTIVO';
            }
            if (element.estatus == 'CANCELADO') {
              element.estatusItem = 'CANCELADO';
            }
            if (element.estatus == 'SUSPENDIDO') {
              element.estatusItem = 'SUSPENDIDO';
            }
            if (element.estatus == 'BAJA') {
              element.estatusItem = 'BAJA';
            }
            element.fecharegistroAux = new Date(element.fecharegistro);
          });
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Sub fiso.', 'error');
      }
    );
  }

  setClickedRowSubfiso(index, subfiso) {
    subfiso.checked = !subfiso.checked;
    if (subfiso.checked) {
      this.subfisoService.setSubfiso(subfiso);

      this.saldoscuentaForm.controls['subfisoId'].setValue(subfiso.id);
      this.saldoscuentaForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.saldoscuentaForm.controls['subfisoId'].setValue(null);
      this.saldoscuentaForm.controls['subfisoItem'].setValue('');
    }
  }

  regresaSaldoscuenta() {
    this.location.back();
  }
}
