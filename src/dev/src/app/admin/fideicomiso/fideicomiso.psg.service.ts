/* PSG  Fideicomiso Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Fideicomiso } from './fideicomiso.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FideicomisoService {
  private env: any = environment;
  private token: string;
  fideicomiso = new Fideicomiso();

  constructor(private http: Http) {}

  postGuardaFideicomiso(fideicomiso) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/fideicomiso`, fideicomiso, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomiso() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomisoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/fideicomiso/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaFideicomiso(fideicomiso, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/fideicomiso/` + id, fideicomiso, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomisoPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisoPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomiso?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetFideicomiso(): Fideicomiso {
    this.clear();
    return this.fideicomiso;
  }

  getFideicomiso(): Fideicomiso {
    var fideicomiso: Fideicomiso = {
      generalesnumero: this.fideicomiso.generalesnumero,
      generalesnombre: this.fideicomiso.generalesnombre,
      generalesadministrador: this.fideicomiso.generalesadministrador,
      generalesadministradorItem: this.fideicomiso.generalesadministradorItem,
      generalespromotor: this.fideicomiso.generalespromotor,
      generalespromotorItem: this.fideicomiso.generalespromotorItem,
      caracteristicasformamanejo: this.fideicomiso.caracteristicasformamanejo,
      caracteristicasformamanejoItem: this.fideicomiso.caracteristicasformamanejoItem,
      caracteristicastiponegocio: this.fideicomiso.caracteristicastiponegocio,
      caracteristicastiponegocioItem: this.fideicomiso.caracteristicastiponegocioItem,
      caracteristicasproducto: this.fideicomiso.caracteristicasproducto,
      caracteristicasproductoItem: this.fideicomiso.caracteristicasproductoItem,
      caracteristicasvalfatca: this.fideicomiso.caracteristicasvalfatca,
      caracteristicasvalfatcaItem: this.fideicomiso.caracteristicasvalfatcaItem,
      caracteristicasmontoapertura: this.fideicomiso.caracteristicasmontoapertura,
      caracteristicasmanejosubfisos: this.fideicomiso.caracteristicasmanejosubfisos,
      caracteristicasmanejosubfisosItem: this.fideicomiso.caracteristicasmanejosubfisosItem,
      caracteristicassujetoart151: this.fideicomiso.caracteristicassujetoart151,
      caracteristicassujetoart151Item: this.fideicomiso.caracteristicassujetoart151Item,
      caracteristicascerrado: this.fideicomiso.caracteristicascerrado,
      caracteristicascerradoItem: this.fideicomiso.caracteristicascerradoItem,
      caracteristicasrevocable: this.fideicomiso.caracteristicasrevocable,
      caracteristicasrevocableItem: this.fideicomiso.caracteristicasrevocableItem,
      caracteristicasescontratoeje: this.fideicomiso.caracteristicasescontratoeje,
      caracteristicasescontratoejeItem: this.fideicomiso.caracteristicasescontratoejeItem,
      caracteristicascomitetecnico: this.fideicomiso.caracteristicascomitetecnico,
      caracteristicascomitetecnicoItem: this.fideicomiso.caracteristicascomitetecnicoItem,
      caracteristicasofibanxico: this.fideicomiso.caracteristicasofibanxico,
      caracteristicasmanejamonext: this.fideicomiso.caracteristicasmanejamonext,
      caracteristicasmanejamonextItem: this.fideicomiso.caracteristicasmanejamonextItem,
      caracteristicasivafronterizo: this.fideicomiso.caracteristicasivafronterizo,
      caracteristicasivafronterizoItem: this.fideicomiso.caracteristicasivafronterizoItem,
      caracteristicasfechaalta: this.fideicomiso.caracteristicasfechaalta,
      caracteristicasfechaaltaAux: this.fideicomiso.caracteristicasfechaaltaAux,
      caracteristicasfechaconstitucion: this.fideicomiso.caracteristicasfechaconstitucion,
      caracteristicasfechaconstitucionAux: this.fideicomiso.caracteristicasfechaconstitucionAux,
      caracteristicasfechaaprobacion: this.fideicomiso.caracteristicasfechaaprobacion,
      caracteristicasfechaaprobacionAux: this.fideicomiso.caracteristicasfechaaprobacionAux,
      caracteristicasestado: this.fideicomiso.caracteristicasestado,
      caracteristicasestadoItem: this.fideicomiso.caracteristicasestadoItem,
      adicionalestipo: this.fideicomiso.adicionalestipo,
      adicionalestipoItem: this.fideicomiso.adicionalestipoItem,
      adicionalestipopersona: this.fideicomiso.adicionalestipopersona,
      adicionalestipopersonaItem: this.fideicomiso.adicionalestipopersonaItem,
      adicionalesconactividadempresarial: this.fideicomiso.adicionalesconactividadempresarial,
      adicionalesconactividadempresarialItem: this.fideicomiso.adicionalesconactividadempresarialItem,
      adicionalespermisosre: this.fideicomiso.adicionalespermisosre,
      adicionalesfechapermisosre: this.fideicomiso.adicionalesfechapermisosre,
      adicionalesfechapermisosreAux: this.fideicomiso.adicionalesfechapermisosreAux,
      adicionalesprovsustfiduciaria: this.fideicomiso.adicionalesprovsustfiduciaria,
      adicionalesprovsustfiduciariaItem: this.fideicomiso.adicionalesprovsustfiduciariaItem,
      adicionalesfondosinterfaseafore: this.fideicomiso.adicionalesfondosinterfaseafore,
      adicionalesfondosinterfaseaforeItem: this.fideicomiso.adicionalesfondosinterfaseaforeItem,
      adicionalesregnalinvext: this.fideicomiso.adicionalesregnalinvext,
      adicionalesfechainscripcion: this.fideicomiso.adicionalesfechainscripcion,
      adicionalesfechainscripcionAux: this.fideicomiso.adicionalesfechainscripcionAux,
      adicionalesformalizacioncontrato: this.fideicomiso.adicionalesformalizacioncontrato,
      adicionalesformalizacioncontratoItem: this.fideicomiso.adicionalesformalizacioncontratoItem,
      adicionalesnoescritura: this.fideicomiso.adicionalesnoescritura,
      adicionalesfechaescritura: this.fideicomiso.adicionalesfechaescritura,
      adicionalesfechaescrituraAux: this.fideicomiso.adicionalesfechaescrituraAux,
      adicionalesnombrenotario: this.fideicomiso.adicionalesnombrenotario,
      adicionalesnombrenotarioItem: this.fideicomiso.adicionalesnombrenotarioItem,
      adicionalesnonotario: this.fideicomiso.adicionalesnonotario,
      adicionalesciudadnotario: this.fideicomiso.adicionalesciudadnotario,
      adicionalesestadonotario: this.fideicomiso.adicionalesestadonotario,
      adicionalespaisnotario: this.fideicomiso.adicionalespaisnotario,
      adicionalesfolioregistropublico: this.fideicomiso.adicionalesfolioregistropublico,
      adicionalesfechainscripcionregpublico: this.fideicomiso.adicionalesfechainscripcionregpublico,
      adicionalesfechainscripcionregpublicoAux: this.fideicomiso.adicionalesfechainscripcionregpublicoAux,
      adicionalesadministracion: this.fideicomiso.adicionalesadministracion,
      adicionalesadministracionItem: this.fideicomiso.adicionalesadministracionItem,
      adicionalescontabilidaddelegada: this.fideicomiso.adicionalescontabilidaddelegada,
      adicionalescontabilidaddelegadaItem: this.fideicomiso.adicionalescontabilidaddelegadaItem,
      datosbanxicoactividadeconomica: this.fideicomiso.datosbanxicoactividadeconomica,
      datosbanxicofiducuario: this.fideicomiso.datosbanxicofiducuario,
      datosbanxicosectorbancario: this.fideicomiso.datosbanxicosectorbancario,
      datosbanxicolocalidad: this.fideicomiso.datosbanxicolocalidad,
      datosbanxicocentroresp: this.fideicomiso.datosbanxicocentroresp,
      datosbanxiconocr: this.fideicomiso.datosbanxiconocr,
      datosbanxicorfccontrato: this.fideicomiso.datosbanxicorfccontrato,
      datosbanxiconumerocliente: this.fideicomiso.datosbanxiconumerocliente,
    };
    return fideicomiso;
  }

  setFideicomiso(fideicomiso: Fideicomiso) {
    this.fideicomiso.generalesnumero = fideicomiso.generalesnumero;
    this.fideicomiso.generalesnombre = fideicomiso.generalesnombre;
    this.fideicomiso.generalesadministrador = fideicomiso.generalesadministrador;
    this.fideicomiso.generalesadministradorItem = fideicomiso.generalesadministradorItem;
    this.fideicomiso.generalespromotor = fideicomiso.generalespromotor;
    this.fideicomiso.generalespromotorItem = fideicomiso.generalespromotorItem;
    this.fideicomiso.caracteristicasformamanejo = fideicomiso.caracteristicasformamanejo;
    this.fideicomiso.caracteristicasformamanejoItem = fideicomiso.caracteristicasformamanejoItem;
    this.fideicomiso.caracteristicastiponegocio = fideicomiso.caracteristicastiponegocio;
    this.fideicomiso.caracteristicastiponegocioItem = fideicomiso.caracteristicastiponegocioItem;
    this.fideicomiso.caracteristicasproducto = fideicomiso.caracteristicasproducto;
    this.fideicomiso.caracteristicasproductoItem = fideicomiso.caracteristicasproductoItem;
    this.fideicomiso.caracteristicasvalfatca = fideicomiso.caracteristicasvalfatca;
    this.fideicomiso.caracteristicasvalfatcaItem = fideicomiso.caracteristicasvalfatcaItem;
    this.fideicomiso.caracteristicasmontoapertura = fideicomiso.caracteristicasmontoapertura;
    this.fideicomiso.caracteristicasmanejosubfisos = fideicomiso.caracteristicasmanejosubfisos;
    this.fideicomiso.caracteristicasmanejosubfisosItem = fideicomiso.caracteristicasmanejosubfisosItem;
    this.fideicomiso.caracteristicassujetoart151 = fideicomiso.caracteristicassujetoart151;
    this.fideicomiso.caracteristicassujetoart151Item = fideicomiso.caracteristicassujetoart151Item;
    this.fideicomiso.caracteristicascerrado = fideicomiso.caracteristicascerrado;
    this.fideicomiso.caracteristicascerradoItem = fideicomiso.caracteristicascerradoItem;
    this.fideicomiso.caracteristicasrevocable = fideicomiso.caracteristicasrevocable;
    this.fideicomiso.caracteristicasrevocableItem = fideicomiso.caracteristicasrevocableItem;
    this.fideicomiso.caracteristicasescontratoeje = fideicomiso.caracteristicasescontratoeje;
    this.fideicomiso.caracteristicasescontratoejeItem = fideicomiso.caracteristicasescontratoejeItem;
    this.fideicomiso.caracteristicascomitetecnico = fideicomiso.caracteristicascomitetecnico;
    this.fideicomiso.caracteristicascomitetecnicoItem = fideicomiso.caracteristicascomitetecnicoItem;
    this.fideicomiso.caracteristicasofibanxico = fideicomiso.caracteristicasofibanxico;
    this.fideicomiso.caracteristicasmanejamonext = fideicomiso.caracteristicasmanejamonext;
    this.fideicomiso.caracteristicasmanejamonextItem = fideicomiso.caracteristicasmanejamonextItem;
    this.fideicomiso.caracteristicasivafronterizo = fideicomiso.caracteristicasivafronterizo;
    this.fideicomiso.caracteristicasivafronterizoItem = fideicomiso.caracteristicasivafronterizoItem;
    this.fideicomiso.caracteristicasfechaalta = fideicomiso.caracteristicasfechaalta;
    this.fideicomiso.caracteristicasfechaaltaAux = fideicomiso.caracteristicasfechaaltaAux;
    this.fideicomiso.caracteristicasfechaconstitucion = fideicomiso.caracteristicasfechaconstitucion;
    this.fideicomiso.caracteristicasfechaconstitucionAux = fideicomiso.caracteristicasfechaconstitucionAux;
    this.fideicomiso.caracteristicasfechaaprobacion = fideicomiso.caracteristicasfechaaprobacion;
    this.fideicomiso.caracteristicasfechaaprobacionAux = fideicomiso.caracteristicasfechaaprobacionAux;
    this.fideicomiso.caracteristicasestado = fideicomiso.caracteristicasestado;
    this.fideicomiso.caracteristicasestadoItem = fideicomiso.caracteristicasestadoItem;
    this.fideicomiso.adicionalestipo = fideicomiso.adicionalestipo;
    this.fideicomiso.adicionalestipoItem = fideicomiso.adicionalestipoItem;
    this.fideicomiso.adicionalestipopersona = fideicomiso.adicionalestipopersona;
    this.fideicomiso.adicionalestipopersonaItem = fideicomiso.adicionalestipopersonaItem;
    this.fideicomiso.adicionalesconactividadempresarial = fideicomiso.adicionalesconactividadempresarial;
    this.fideicomiso.adicionalesconactividadempresarialItem = fideicomiso.adicionalesconactividadempresarialItem;
    this.fideicomiso.adicionalespermisosre = fideicomiso.adicionalespermisosre;
    this.fideicomiso.adicionalesfechapermisosre = fideicomiso.adicionalesfechapermisosre;
    this.fideicomiso.adicionalesfechapermisosreAux = fideicomiso.adicionalesfechapermisosreAux;
    this.fideicomiso.adicionalesprovsustfiduciaria = fideicomiso.adicionalesprovsustfiduciaria;
    this.fideicomiso.adicionalesprovsustfiduciariaItem = fideicomiso.adicionalesprovsustfiduciariaItem;
    this.fideicomiso.adicionalesfondosinterfaseafore = fideicomiso.adicionalesfondosinterfaseafore;
    this.fideicomiso.adicionalesfondosinterfaseaforeItem = fideicomiso.adicionalesfondosinterfaseaforeItem;
    this.fideicomiso.adicionalesregnalinvext = fideicomiso.adicionalesregnalinvext;
    this.fideicomiso.adicionalesfechainscripcion = fideicomiso.adicionalesfechainscripcion;
    this.fideicomiso.adicionalesfechainscripcionAux = fideicomiso.adicionalesfechainscripcionAux;
    this.fideicomiso.adicionalesformalizacioncontrato = fideicomiso.adicionalesformalizacioncontrato;
    this.fideicomiso.adicionalesformalizacioncontratoItem = fideicomiso.adicionalesformalizacioncontratoItem;
    this.fideicomiso.adicionalesnoescritura = fideicomiso.adicionalesnoescritura;
    this.fideicomiso.adicionalesfechaescritura = fideicomiso.adicionalesfechaescritura;
    this.fideicomiso.adicionalesfechaescrituraAux = fideicomiso.adicionalesfechaescrituraAux;
    this.fideicomiso.adicionalesnombrenotario = fideicomiso.adicionalesnombrenotario;
    this.fideicomiso.adicionalesnombrenotarioItem = fideicomiso.adicionalesnombrenotarioItem;
    this.fideicomiso.adicionalesnonotario = fideicomiso.adicionalesnonotario;
    this.fideicomiso.adicionalesciudadnotario = fideicomiso.adicionalesciudadnotario;
    this.fideicomiso.adicionalesestadonotario = fideicomiso.adicionalesestadonotario;
    this.fideicomiso.adicionalespaisnotario = fideicomiso.adicionalespaisnotario;
    this.fideicomiso.adicionalesfolioregistropublico = fideicomiso.adicionalesfolioregistropublico;
    this.fideicomiso.adicionalesfechainscripcionregpublico = fideicomiso.adicionalesfechainscripcionregpublico;
    this.fideicomiso.adicionalesfechainscripcionregpublicoAux = fideicomiso.adicionalesfechainscripcionregpublicoAux;
    this.fideicomiso.adicionalesadministracion = fideicomiso.adicionalesadministracion;
    this.fideicomiso.adicionalesadministracionItem = fideicomiso.adicionalesadministracionItem;
    this.fideicomiso.adicionalescontabilidaddelegada = fideicomiso.adicionalescontabilidaddelegada;
    this.fideicomiso.adicionalescontabilidaddelegadaItem = fideicomiso.adicionalescontabilidaddelegadaItem;
    this.fideicomiso.datosbanxicoactividadeconomica = fideicomiso.datosbanxicoactividadeconomica;
    this.fideicomiso.datosbanxicofiducuario = fideicomiso.datosbanxicofiducuario;
    this.fideicomiso.datosbanxicosectorbancario = fideicomiso.datosbanxicosectorbancario;
    this.fideicomiso.datosbanxicolocalidad = fideicomiso.datosbanxicolocalidad;
    this.fideicomiso.datosbanxicocentroresp = fideicomiso.datosbanxicocentroresp;
    this.fideicomiso.datosbanxiconocr = fideicomiso.datosbanxiconocr;
    this.fideicomiso.datosbanxicorfccontrato = fideicomiso.datosbanxicorfccontrato;
    this.fideicomiso.datosbanxiconumerocliente = fideicomiso.datosbanxiconumerocliente;
  }

  clear() {
    this.fideicomiso.generalesnumero = null;
    this.fideicomiso.generalesnombre = null;
    this.fideicomiso.generalesadministrador = null;
    this.fideicomiso.generalesadministradorItem = null;
    this.fideicomiso.generalespromotor = null;
    this.fideicomiso.generalespromotorItem = null;
    this.fideicomiso.caracteristicasformamanejo = null;
    this.fideicomiso.caracteristicasformamanejoItem = null;
    this.fideicomiso.caracteristicastiponegocio = null;
    this.fideicomiso.caracteristicastiponegocioItem = null;
    this.fideicomiso.caracteristicasproducto = null;
    this.fideicomiso.caracteristicasproductoItem = null;
    this.fideicomiso.caracteristicasvalfatca = null;
    this.fideicomiso.caracteristicasvalfatcaItem = null;
    this.fideicomiso.caracteristicasmontoapertura = null;
    this.fideicomiso.caracteristicasmanejosubfisos = null;
    this.fideicomiso.caracteristicasmanejosubfisosItem = null;
    this.fideicomiso.caracteristicassujetoart151 = null;
    this.fideicomiso.caracteristicassujetoart151Item = null;
    this.fideicomiso.caracteristicascerrado = null;
    this.fideicomiso.caracteristicascerradoItem = null;
    this.fideicomiso.caracteristicasrevocable = null;
    this.fideicomiso.caracteristicasrevocableItem = null;
    this.fideicomiso.caracteristicasescontratoeje = null;
    this.fideicomiso.caracteristicasescontratoejeItem = null;
    this.fideicomiso.caracteristicascomitetecnico = null;
    this.fideicomiso.caracteristicascomitetecnicoItem = null;
    this.fideicomiso.caracteristicasofibanxico = null;
    this.fideicomiso.caracteristicasmanejamonext = null;
    this.fideicomiso.caracteristicasmanejamonextItem = null;
    this.fideicomiso.caracteristicasivafronterizo = null;
    this.fideicomiso.caracteristicasivafronterizoItem = null;
    this.fideicomiso.caracteristicasfechaalta = null;
    this.fideicomiso.caracteristicasfechaaltaAux = null;
    this.fideicomiso.caracteristicasfechaconstitucion = null;
    this.fideicomiso.caracteristicasfechaconstitucionAux = null;
    this.fideicomiso.caracteristicasfechaaprobacion = null;
    this.fideicomiso.caracteristicasfechaaprobacionAux = null;
    this.fideicomiso.caracteristicasestado = null;
    this.fideicomiso.caracteristicasestadoItem = null;
    this.fideicomiso.adicionalestipo = null;
    this.fideicomiso.adicionalestipoItem = null;
    this.fideicomiso.adicionalestipopersona = null;
    this.fideicomiso.adicionalestipopersonaItem = null;
    this.fideicomiso.adicionalesconactividadempresarial = null;
    this.fideicomiso.adicionalesconactividadempresarialItem = null;
    this.fideicomiso.adicionalespermisosre = null;
    this.fideicomiso.adicionalesfechapermisosre = null;
    this.fideicomiso.adicionalesfechapermisosreAux = null;
    this.fideicomiso.adicionalesprovsustfiduciaria = null;
    this.fideicomiso.adicionalesprovsustfiduciariaItem = null;
    this.fideicomiso.adicionalesfondosinterfaseafore = null;
    this.fideicomiso.adicionalesfondosinterfaseaforeItem = null;
    this.fideicomiso.adicionalesregnalinvext = null;
    this.fideicomiso.adicionalesfechainscripcion = null;
    this.fideicomiso.adicionalesfechainscripcionAux = null;
    this.fideicomiso.adicionalesformalizacioncontrato = null;
    this.fideicomiso.adicionalesformalizacioncontratoItem = null;
    this.fideicomiso.adicionalesnoescritura = null;
    this.fideicomiso.adicionalesfechaescritura = null;
    this.fideicomiso.adicionalesfechaescrituraAux = null;
    this.fideicomiso.adicionalesnombrenotario = null;
    this.fideicomiso.adicionalesnombrenotarioItem = null;
    this.fideicomiso.adicionalesnonotario = null;
    this.fideicomiso.adicionalesciudadnotario = null;
    this.fideicomiso.adicionalesestadonotario = null;
    this.fideicomiso.adicionalespaisnotario = null;
    this.fideicomiso.adicionalesfolioregistropublico = null;
    this.fideicomiso.adicionalesfechainscripcionregpublico = null;
    this.fideicomiso.adicionalesfechainscripcionregpublicoAux = null;
    this.fideicomiso.adicionalesadministracion = null;
    this.fideicomiso.adicionalesadministracionItem = null;
    this.fideicomiso.adicionalescontabilidaddelegada = null;
    this.fideicomiso.adicionalescontabilidaddelegadaItem = null;
    this.fideicomiso.datosbanxicoactividadeconomica = null;
    this.fideicomiso.datosbanxicofiducuario = null;
    this.fideicomiso.datosbanxicosectorbancario = null;
    this.fideicomiso.datosbanxicolocalidad = null;
    this.fideicomiso.datosbanxicocentroresp = null;
    this.fideicomiso.datosbanxiconocr = null;
    this.fideicomiso.datosbanxicorfccontrato = null;
    this.fideicomiso.datosbanxiconumerocliente = null;
  }
}
