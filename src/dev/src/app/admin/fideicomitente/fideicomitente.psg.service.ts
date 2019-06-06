/* PSG  Fideicomitente Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Fideicomitente } from './fideicomitente.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FideicomitenteService {
  private env: any = environment;
  private token: string;
  fideicomitente = new Fideicomitente();

  constructor(private http: Http) {}

  postGuardaFideicomitente(fideicomitente) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/fideicomitente`, fideicomitente, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomitente() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomitentePorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/fideicomitente/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaFideicomitente(fideicomitente, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/fideicomitente/` + id, fideicomitente, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomitentePorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomitentePorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomitente?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetFideicomitente(): Fideicomitente {
    this.clear();
    return this.fideicomitente;
  }

  getFideicomitente(): Fideicomitente {
    var fideicomitente: Fideicomitente = {
      numerofideicomitente: this.fideicomitente.numerofideicomitente,
      tipopersona: this.fideicomitente.tipopersona,
      tipopersonaItem: this.fideicomitente.tipopersonaItem,
      participante: this.fideicomitente.participante,
      fideicomisoId: this.fideicomitente.fideicomisoId,
      fideicomisoItem: this.fideicomitente.fideicomisoItem,
      regimenfiscal: this.fideicomitente.regimenfiscal,
      regimenfiscalItem: this.fideicomitente.regimenfiscalItem,
      generalescontroladorfideicomiso: this.fideicomitente.generalescontroladorfideicomiso,
      generalescontroladorfideicomisoItem: this.fideicomitente.generalescontroladorfideicomisoItem,
      generalesnacionalidad: this.fideicomitente.generalesnacionalidad,
      generalesnacionalidadItem: this.fideicomitente.generalesnacionalidadItem,
      generalespaisorigen: this.fideicomitente.generalespaisorigen,
      generalespaisorigenItem: this.fideicomitente.generalespaisorigenItem,
      generalesactividad: this.fideicomitente.generalesactividad,
      generalesactividadItem: this.fideicomitente.generalesactividadItem,
      generalesaportarecursos: this.fideicomitente.generalesaportarecursos,
      generalesaportarecursosItem: this.fideicomitente.generalesaportarecursosItem,
      generalespaisresidencia: this.fideicomitente.generalespaisresidencia,
      generalespaisresidenciaItem: this.fideicomitente.generalespaisresidenciaItem,
      generalesclientescotiabank: this.fideicomitente.generalesclientescotiabank,
      generalesclientescotiabankItem: this.fideicomitente.generalesclientescotiabankItem,
      generalespep: this.fideicomitente.generalespep,
      generalespepItem: this.fideicomitente.generalespepItem,
      generalesestatus: this.fideicomitente.generalesestatus,
      generalesestatusItem: this.fideicomitente.generalesestatusItem,
      generalesgrupofilial: this.fideicomitente.generalesgrupofilial,
      generalescalidadmigratoria: this.fideicomitente.generalescalidadmigratoria,
      generalescalidadmigratoriaItem: this.fideicomitente.generalescalidadmigratoriaItem,
      generaleslugaroperacion: this.fideicomitente.generaleslugaroperacion,
      generaleslugaroperacionItem: this.fideicomitente.generaleslugaroperacionItem,
      generalesoperacuentaterceros: this.fideicomitente.generalesoperacuentaterceros,
      generalesoperacuentatercerosItem: this.fideicomitente.generalesoperacuentatercerosItem,
      generalesnivelparticipante: this.fideicomitente.generalesnivelparticipante,
      generalesnivelparticipanteItem: this.fideicomitente.generalesnivelparticipanteItem,
      generalesclienterelacionpep: this.fideicomitente.generalesclienterelacionpep,
      generalesclienterelacionpepItem: this.fideicomitente.generalesclienterelacionpepItem,
      generalesgrado: this.fideicomitente.generalesgrado,
      infopldkychonorarios: this.fideicomitente.infopldkychonorarios,
      infopldkyccomisiones: this.fideicomitente.infopldkyccomisiones,
      infopldkyccomisionesItem: this.fideicomitente.infopldkyccomisionesItem,
      infopldkycotros: this.fideicomitente.infopldkycotros,
      infopldkycotrosItem: this.fideicomitente.infopldkycotrosItem,
      infopldkycsueldos: this.fideicomitente.infopldkycsueldos,
      infopldkycsueldosItem: this.fideicomitente.infopldkycsueldosItem,
      infopldkycventa: this.fideicomitente.infopldkycventa,
      infopldkycventaItem: this.fideicomitente.infopldkycventaItem,
      infopldkycinversiones: this.fideicomitente.infopldkycinversiones,
      infopldkycinversionesItem: this.fideicomitente.infopldkycinversionesItem,
      infopldkycarrendamiento: this.fideicomitente.infopldkycarrendamiento,
      infopldkycarrendamientoItem: this.fideicomitente.infopldkycarrendamientoItem,
      infopldkyctipopatrimonio: this.fideicomitente.infopldkyctipopatrimonio,
      infopldkycinstrumento: this.fideicomitente.infopldkycinstrumento,
      infopldkycinstrumentoItem: this.fideicomitente.infopldkycinstrumentoItem,
      infopldkycrazonapertura: this.fideicomitente.infopldkycrazonapertura,
      infopldkyccomentarios: this.fideicomitente.infopldkyccomentarios,
      infopldkycnivelriesgo: this.fideicomitente.infopldkycnivelriesgo,
      infopldkycnivelriesgoItem: this.fideicomitente.infopldkycnivelriesgoItem,
      infopldkycestatuscalculopld: this.fideicomitente.infopldkycestatuscalculopld,
      infopldkycfechaveriffircosoft: this.fideicomitente.infopldkycfechaveriffircosoft,
      infopldkycfechaveriffircosoftAux: this.fideicomitente.infopldkycfechaveriffircosoftAux,
      identificacionrfc: this.fideicomitente.identificacionrfc,
      identificacioncurp: this.fideicomitente.identificacioncurp,
      identificacionnoserieefirma: this.fideicomitente.identificacionnoserieefirma,
      identificacionpaisresidfisc1: this.fideicomitente.identificacionpaisresidfisc1,
      identificacionpaisresidfisc1Item: this.fideicomitente.identificacionpaisresidfisc1Item,
      identificacionpaisresidfisc2: this.fideicomitente.identificacionpaisresidfisc2,
      identificacionpaisresidfisc2Item: this.fideicomitente.identificacionpaisresidfisc2Item,
      identificacionemail: this.fideicomitente.identificacionemail,
      identificacionfechaconstitucion: this.fideicomitente.identificacionfechaconstitucion,
      identificacionfechaconstitucionAux: this.fideicomitente.identificacionfechaconstitucionAux,
      identificacionsexo: this.fideicomitente.identificacionsexo,
      identificacionsexoItem: this.fideicomitente.identificacionsexoItem,
      identificacionpaiscasa: this.fideicomitente.identificacionpaiscasa,
      identificacionpaiscasaItem: this.fideicomitente.identificacionpaiscasaItem,
      identificacionpaisoficina: this.fideicomitente.identificacionpaisoficina,
      identificacionpaisoficinaItem: this.fideicomitente.identificacionpaisoficinaItem,
      identificacionpaiscelular: this.fideicomitente.identificacionpaiscelular,
      identificacionpaiscelularItem: this.fideicomitente.identificacionpaiscelularItem,
      identificacionfechainiciorelneg: this.fideicomitente.identificacionfechainiciorelneg,
      identificacionfechainiciorelnegAux: this.fideicomitente.identificacionfechainiciorelnegAux,
      identificacionnoidentificacion: this.fideicomitente.identificacionnoidentificacion,
      identificacioncomprobaciondomicilio: this.fideicomitente.identificacioncomprobaciondomicilio,
      identificacionactividadempresarial: this.fideicomitente.identificacionactividadempresarial,
      identificacionactividadempresarialItem: this.fideicomitente.identificacionactividadempresarialItem,
      identificacionnoidentfisc1: this.fideicomitente.identificacionnoidentfisc1,
      identificacionnoidentfisc2: this.fideicomitente.identificacionnoidentfisc2,
      identificacionclasificacionfatca: this.fideicomitente.identificacionclasificacionfatca,
      identificacionladacasa: this.fideicomitente.identificacionladacasa,
      identificacionladaoficina: this.fideicomitente.identificacionladaoficina,
      identificacionladacelular: this.fideicomitente.identificacionladacelular,
      identificacionnumerocasa: this.fideicomitente.identificacionnumerocasa,
      identificacionnumerooficina: this.fideicomitente.identificacionnumerooficina,
      identificacionnumerocelular: this.fideicomitente.identificacionnumerocelular,
      identificacionextoficina: this.fideicomitente.identificacionextoficina,
      identificacionextcelular: this.fideicomitente.identificacionextcelular,
      identificacionidentoficialvig: this.fideicomitente.identificacionidentoficialvig,
      identificacionvigencia: this.fideicomitente.identificacionvigencia,
      escrituranoescritura: this.fideicomitente.escrituranoescritura,
      escrituranotario: this.fideicomitente.escrituranotario,
      escrituranotarioItem: this.fideicomitente.escrituranotarioItem,
      escrituranonotaria: this.fideicomitente.escrituranonotaria,
      escrituraciudad: this.fideicomitente.escrituraciudad,
      escrituratelefono: this.fideicomitente.escrituratelefono,
      escrituraemail: this.fideicomitente.escrituraemail,
      escriturafecha: this.fideicomitente.escriturafecha,
      escriturafechaAux: this.fideicomitente.escriturafechaAux,
      escrituraestado: this.fideicomitente.escrituraestado,
      cuentaskycnocuenta1: this.fideicomitente.cuentaskycnocuenta1,
      cuentaskyctipocuenta1: this.fideicomitente.cuentaskyctipocuenta1,
      cuentaskycnocuenta2: this.fideicomitente.cuentaskycnocuenta2,
      cuentaskyctipocuenta2: this.fideicomitente.cuentaskyctipocuenta2,
      cuentaskycnocuenta3: this.fideicomitente.cuentaskycnocuenta3,
      cuentaskyctipocuenta3: this.fideicomitente.cuentaskyctipocuenta3,
      cuentaskycnocuenta4: this.fideicomitente.cuentaskycnocuenta4,
      cuentaskyctipocuenta4: this.fideicomitente.cuentaskyctipocuenta4,
    };
    return fideicomitente;
  }

  setFideicomitente(fideicomitente: Fideicomitente) {
    this.fideicomitente.numerofideicomitente = fideicomitente.numerofideicomitente;
    this.fideicomitente.tipopersona = fideicomitente.tipopersona;
    this.fideicomitente.tipopersonaItem = fideicomitente.tipopersonaItem;
    this.fideicomitente.participante = fideicomitente.participante;
    this.fideicomitente.fideicomisoId = fideicomitente.fideicomisoId;
    this.fideicomitente.fideicomisoItem = fideicomitente.fideicomisoItem;
    this.fideicomitente.regimenfiscal = fideicomitente.regimenfiscal;
    this.fideicomitente.regimenfiscalItem = fideicomitente.regimenfiscalItem;
    this.fideicomitente.generalescontroladorfideicomiso = fideicomitente.generalescontroladorfideicomiso;
    this.fideicomitente.generalescontroladorfideicomisoItem = fideicomitente.generalescontroladorfideicomisoItem;
    this.fideicomitente.generalesnacionalidad = fideicomitente.generalesnacionalidad;
    this.fideicomitente.generalesnacionalidadItem = fideicomitente.generalesnacionalidadItem;
    this.fideicomitente.generalespaisorigen = fideicomitente.generalespaisorigen;
    this.fideicomitente.generalespaisorigenItem = fideicomitente.generalespaisorigenItem;
    this.fideicomitente.generalesactividad = fideicomitente.generalesactividad;
    this.fideicomitente.generalesactividadItem = fideicomitente.generalesactividadItem;
    this.fideicomitente.generalesaportarecursos = fideicomitente.generalesaportarecursos;
    this.fideicomitente.generalesaportarecursosItem = fideicomitente.generalesaportarecursosItem;
    this.fideicomitente.generalespaisresidencia = fideicomitente.generalespaisresidencia;
    this.fideicomitente.generalespaisresidenciaItem = fideicomitente.generalespaisresidenciaItem;
    this.fideicomitente.generalesclientescotiabank = fideicomitente.generalesclientescotiabank;
    this.fideicomitente.generalesclientescotiabankItem = fideicomitente.generalesclientescotiabankItem;
    this.fideicomitente.generalespep = fideicomitente.generalespep;
    this.fideicomitente.generalespepItem = fideicomitente.generalespepItem;
    this.fideicomitente.generalesestatus = fideicomitente.generalesestatus;
    this.fideicomitente.generalesestatusItem = fideicomitente.generalesestatusItem;
    this.fideicomitente.generalesgrupofilial = fideicomitente.generalesgrupofilial;
    this.fideicomitente.generalescalidadmigratoria = fideicomitente.generalescalidadmigratoria;
    this.fideicomitente.generalescalidadmigratoriaItem = fideicomitente.generalescalidadmigratoriaItem;
    this.fideicomitente.generaleslugaroperacion = fideicomitente.generaleslugaroperacion;
    this.fideicomitente.generaleslugaroperacionItem = fideicomitente.generaleslugaroperacionItem;
    this.fideicomitente.generalesoperacuentaterceros = fideicomitente.generalesoperacuentaterceros;
    this.fideicomitente.generalesoperacuentatercerosItem = fideicomitente.generalesoperacuentatercerosItem;
    this.fideicomitente.generalesnivelparticipante = fideicomitente.generalesnivelparticipante;
    this.fideicomitente.generalesnivelparticipanteItem = fideicomitente.generalesnivelparticipanteItem;
    this.fideicomitente.generalesclienterelacionpep = fideicomitente.generalesclienterelacionpep;
    this.fideicomitente.generalesclienterelacionpepItem = fideicomitente.generalesclienterelacionpepItem;
    this.fideicomitente.generalesgrado = fideicomitente.generalesgrado;
    this.fideicomitente.infopldkychonorarios = fideicomitente.infopldkychonorarios;
    this.fideicomitente.infopldkyccomisiones = fideicomitente.infopldkyccomisiones;
    this.fideicomitente.infopldkyccomisionesItem = fideicomitente.infopldkyccomisionesItem;
    this.fideicomitente.infopldkycotros = fideicomitente.infopldkycotros;
    this.fideicomitente.infopldkycotrosItem = fideicomitente.infopldkycotrosItem;
    this.fideicomitente.infopldkycsueldos = fideicomitente.infopldkycsueldos;
    this.fideicomitente.infopldkycsueldosItem = fideicomitente.infopldkycsueldosItem;
    this.fideicomitente.infopldkycventa = fideicomitente.infopldkycventa;
    this.fideicomitente.infopldkycventaItem = fideicomitente.infopldkycventaItem;
    this.fideicomitente.infopldkycinversiones = fideicomitente.infopldkycinversiones;
    this.fideicomitente.infopldkycinversionesItem = fideicomitente.infopldkycinversionesItem;
    this.fideicomitente.infopldkycarrendamiento = fideicomitente.infopldkycarrendamiento;
    this.fideicomitente.infopldkycarrendamientoItem = fideicomitente.infopldkycarrendamientoItem;
    this.fideicomitente.infopldkyctipopatrimonio = fideicomitente.infopldkyctipopatrimonio;
    this.fideicomitente.infopldkycinstrumento = fideicomitente.infopldkycinstrumento;
    this.fideicomitente.infopldkycinstrumentoItem = fideicomitente.infopldkycinstrumentoItem;
    this.fideicomitente.infopldkycrazonapertura = fideicomitente.infopldkycrazonapertura;
    this.fideicomitente.infopldkyccomentarios = fideicomitente.infopldkyccomentarios;
    this.fideicomitente.infopldkycnivelriesgo = fideicomitente.infopldkycnivelriesgo;
    this.fideicomitente.infopldkycnivelriesgoItem = fideicomitente.infopldkycnivelriesgoItem;
    this.fideicomitente.infopldkycestatuscalculopld = fideicomitente.infopldkycestatuscalculopld;
    this.fideicomitente.infopldkycfechaveriffircosoft = fideicomitente.infopldkycfechaveriffircosoft;
    this.fideicomitente.infopldkycfechaveriffircosoftAux = fideicomitente.infopldkycfechaveriffircosoftAux;
    this.fideicomitente.identificacionrfc = fideicomitente.identificacionrfc;
    this.fideicomitente.identificacioncurp = fideicomitente.identificacioncurp;
    this.fideicomitente.identificacionnoserieefirma = fideicomitente.identificacionnoserieefirma;
    this.fideicomitente.identificacionpaisresidfisc1 = fideicomitente.identificacionpaisresidfisc1;
    this.fideicomitente.identificacionpaisresidfisc1Item = fideicomitente.identificacionpaisresidfisc1Item;
    this.fideicomitente.identificacionpaisresidfisc2 = fideicomitente.identificacionpaisresidfisc2;
    this.fideicomitente.identificacionpaisresidfisc2Item = fideicomitente.identificacionpaisresidfisc2Item;
    this.fideicomitente.identificacionemail = fideicomitente.identificacionemail;
    this.fideicomitente.identificacionfechaconstitucion = fideicomitente.identificacionfechaconstitucion;
    this.fideicomitente.identificacionfechaconstitucionAux = fideicomitente.identificacionfechaconstitucionAux;
    this.fideicomitente.identificacionsexo = fideicomitente.identificacionsexo;
    this.fideicomitente.identificacionsexoItem = fideicomitente.identificacionsexoItem;
    this.fideicomitente.identificacionpaiscasa = fideicomitente.identificacionpaiscasa;
    this.fideicomitente.identificacionpaiscasaItem = fideicomitente.identificacionpaiscasaItem;
    this.fideicomitente.identificacionpaisoficina = fideicomitente.identificacionpaisoficina;
    this.fideicomitente.identificacionpaisoficinaItem = fideicomitente.identificacionpaisoficinaItem;
    this.fideicomitente.identificacionpaiscelular = fideicomitente.identificacionpaiscelular;
    this.fideicomitente.identificacionpaiscelularItem = fideicomitente.identificacionpaiscelularItem;
    this.fideicomitente.identificacionfechainiciorelneg = fideicomitente.identificacionfechainiciorelneg;
    this.fideicomitente.identificacionfechainiciorelnegAux = fideicomitente.identificacionfechainiciorelnegAux;
    this.fideicomitente.identificacionnoidentificacion = fideicomitente.identificacionnoidentificacion;
    this.fideicomitente.identificacioncomprobaciondomicilio = fideicomitente.identificacioncomprobaciondomicilio;
    this.fideicomitente.identificacionactividadempresarial = fideicomitente.identificacionactividadempresarial;
    this.fideicomitente.identificacionactividadempresarialItem = fideicomitente.identificacionactividadempresarialItem;
    this.fideicomitente.identificacionnoidentfisc1 = fideicomitente.identificacionnoidentfisc1;
    this.fideicomitente.identificacionnoidentfisc2 = fideicomitente.identificacionnoidentfisc2;
    this.fideicomitente.identificacionclasificacionfatca = fideicomitente.identificacionclasificacionfatca;
    this.fideicomitente.identificacionladacasa = fideicomitente.identificacionladacasa;
    this.fideicomitente.identificacionladaoficina = fideicomitente.identificacionladaoficina;
    this.fideicomitente.identificacionladacelular = fideicomitente.identificacionladacelular;
    this.fideicomitente.identificacionnumerocasa = fideicomitente.identificacionnumerocasa;
    this.fideicomitente.identificacionnumerooficina = fideicomitente.identificacionnumerooficina;
    this.fideicomitente.identificacionnumerocelular = fideicomitente.identificacionnumerocelular;
    this.fideicomitente.identificacionextoficina = fideicomitente.identificacionextoficina;
    this.fideicomitente.identificacionextcelular = fideicomitente.identificacionextcelular;
    this.fideicomitente.identificacionidentoficialvig = fideicomitente.identificacionidentoficialvig;
    this.fideicomitente.identificacionvigencia = fideicomitente.identificacionvigencia;
    this.fideicomitente.escrituranoescritura = fideicomitente.escrituranoescritura;
    this.fideicomitente.escrituranotario = fideicomitente.escrituranotario;
    this.fideicomitente.escrituranotarioItem = fideicomitente.escrituranotarioItem;
    this.fideicomitente.escrituranonotaria = fideicomitente.escrituranonotaria;
    this.fideicomitente.escrituraciudad = fideicomitente.escrituraciudad;
    this.fideicomitente.escrituratelefono = fideicomitente.escrituratelefono;
    this.fideicomitente.escrituraemail = fideicomitente.escrituraemail;
    this.fideicomitente.escriturafecha = fideicomitente.escriturafecha;
    this.fideicomitente.escriturafechaAux = fideicomitente.escriturafechaAux;
    this.fideicomitente.escrituraestado = fideicomitente.escrituraestado;
    this.fideicomitente.cuentaskycnocuenta1 = fideicomitente.cuentaskycnocuenta1;
    this.fideicomitente.cuentaskyctipocuenta1 = fideicomitente.cuentaskyctipocuenta1;
    this.fideicomitente.cuentaskycnocuenta2 = fideicomitente.cuentaskycnocuenta2;
    this.fideicomitente.cuentaskyctipocuenta2 = fideicomitente.cuentaskyctipocuenta2;
    this.fideicomitente.cuentaskycnocuenta3 = fideicomitente.cuentaskycnocuenta3;
    this.fideicomitente.cuentaskyctipocuenta3 = fideicomitente.cuentaskyctipocuenta3;
    this.fideicomitente.cuentaskycnocuenta4 = fideicomitente.cuentaskycnocuenta4;
    this.fideicomitente.cuentaskyctipocuenta4 = fideicomitente.cuentaskyctipocuenta4;
  }

  clear() {
    this.fideicomitente.numerofideicomitente = null;
    this.fideicomitente.tipopersona = null;
    this.fideicomitente.tipopersonaItem = null;
    this.fideicomitente.participante = null;
    this.fideicomitente.fideicomisoId = null;
    this.fideicomitente.fideicomisoItem = null;
    this.fideicomitente.regimenfiscal = null;
    this.fideicomitente.regimenfiscalItem = null;
    this.fideicomitente.generalescontroladorfideicomiso = null;
    this.fideicomitente.generalescontroladorfideicomisoItem = null;
    this.fideicomitente.generalesnacionalidad = null;
    this.fideicomitente.generalesnacionalidadItem = null;
    this.fideicomitente.generalespaisorigen = null;
    this.fideicomitente.generalespaisorigenItem = null;
    this.fideicomitente.generalesactividad = null;
    this.fideicomitente.generalesactividadItem = null;
    this.fideicomitente.generalesaportarecursos = null;
    this.fideicomitente.generalesaportarecursosItem = null;
    this.fideicomitente.generalespaisresidencia = null;
    this.fideicomitente.generalespaisresidenciaItem = null;
    this.fideicomitente.generalesclientescotiabank = null;
    this.fideicomitente.generalesclientescotiabankItem = null;
    this.fideicomitente.generalespep = null;
    this.fideicomitente.generalespepItem = null;
    this.fideicomitente.generalesestatus = null;
    this.fideicomitente.generalesestatusItem = null;
    this.fideicomitente.generalesgrupofilial = null;
    this.fideicomitente.generalescalidadmigratoria = null;
    this.fideicomitente.generalescalidadmigratoriaItem = null;
    this.fideicomitente.generaleslugaroperacion = null;
    this.fideicomitente.generaleslugaroperacionItem = null;
    this.fideicomitente.generalesoperacuentaterceros = null;
    this.fideicomitente.generalesoperacuentatercerosItem = null;
    this.fideicomitente.generalesnivelparticipante = null;
    this.fideicomitente.generalesnivelparticipanteItem = null;
    this.fideicomitente.generalesclienterelacionpep = null;
    this.fideicomitente.generalesclienterelacionpepItem = null;
    this.fideicomitente.generalesgrado = null;
    this.fideicomitente.infopldkychonorarios = null;
    this.fideicomitente.infopldkyccomisiones = null;
    this.fideicomitente.infopldkyccomisionesItem = null;
    this.fideicomitente.infopldkycotros = null;
    this.fideicomitente.infopldkycotrosItem = null;
    this.fideicomitente.infopldkycsueldos = null;
    this.fideicomitente.infopldkycsueldosItem = null;
    this.fideicomitente.infopldkycventa = null;
    this.fideicomitente.infopldkycventaItem = null;
    this.fideicomitente.infopldkycinversiones = null;
    this.fideicomitente.infopldkycinversionesItem = null;
    this.fideicomitente.infopldkycarrendamiento = null;
    this.fideicomitente.infopldkycarrendamientoItem = null;
    this.fideicomitente.infopldkyctipopatrimonio = null;
    this.fideicomitente.infopldkycinstrumento = null;
    this.fideicomitente.infopldkycinstrumentoItem = null;
    this.fideicomitente.infopldkycrazonapertura = null;
    this.fideicomitente.infopldkyccomentarios = null;
    this.fideicomitente.infopldkycnivelriesgo = null;
    this.fideicomitente.infopldkycnivelriesgoItem = null;
    this.fideicomitente.infopldkycestatuscalculopld = null;
    this.fideicomitente.infopldkycfechaveriffircosoft = null;
    this.fideicomitente.infopldkycfechaveriffircosoftAux = null;
    this.fideicomitente.identificacionrfc = null;
    this.fideicomitente.identificacioncurp = null;
    this.fideicomitente.identificacionnoserieefirma = null;
    this.fideicomitente.identificacionpaisresidfisc1 = null;
    this.fideicomitente.identificacionpaisresidfisc1Item = null;
    this.fideicomitente.identificacionpaisresidfisc2 = null;
    this.fideicomitente.identificacionpaisresidfisc2Item = null;
    this.fideicomitente.identificacionemail = null;
    this.fideicomitente.identificacionfechaconstitucion = null;
    this.fideicomitente.identificacionfechaconstitucionAux = null;
    this.fideicomitente.identificacionsexo = null;
    this.fideicomitente.identificacionsexoItem = null;
    this.fideicomitente.identificacionpaiscasa = null;
    this.fideicomitente.identificacionpaiscasaItem = null;
    this.fideicomitente.identificacionpaisoficina = null;
    this.fideicomitente.identificacionpaisoficinaItem = null;
    this.fideicomitente.identificacionpaiscelular = null;
    this.fideicomitente.identificacionpaiscelularItem = null;
    this.fideicomitente.identificacionfechainiciorelneg = null;
    this.fideicomitente.identificacionfechainiciorelnegAux = null;
    this.fideicomitente.identificacionnoidentificacion = null;
    this.fideicomitente.identificacioncomprobaciondomicilio = null;
    this.fideicomitente.identificacionactividadempresarial = null;
    this.fideicomitente.identificacionactividadempresarialItem = null;
    this.fideicomitente.identificacionnoidentfisc1 = null;
    this.fideicomitente.identificacionnoidentfisc2 = null;
    this.fideicomitente.identificacionclasificacionfatca = null;
    this.fideicomitente.identificacionladacasa = null;
    this.fideicomitente.identificacionladaoficina = null;
    this.fideicomitente.identificacionladacelular = null;
    this.fideicomitente.identificacionnumerocasa = null;
    this.fideicomitente.identificacionnumerooficina = null;
    this.fideicomitente.identificacionnumerocelular = null;
    this.fideicomitente.identificacionextoficina = null;
    this.fideicomitente.identificacionextcelular = null;
    this.fideicomitente.identificacionidentoficialvig = null;
    this.fideicomitente.identificacionvigencia = null;
    this.fideicomitente.escrituranoescritura = null;
    this.fideicomitente.escrituranotario = null;
    this.fideicomitente.escrituranotarioItem = null;
    this.fideicomitente.escrituranonotaria = null;
    this.fideicomitente.escrituraciudad = null;
    this.fideicomitente.escrituratelefono = null;
    this.fideicomitente.escrituraemail = null;
    this.fideicomitente.escriturafecha = null;
    this.fideicomitente.escriturafechaAux = null;
    this.fideicomitente.escrituraestado = null;
    this.fideicomitente.cuentaskycnocuenta1 = null;
    this.fideicomitente.cuentaskyctipocuenta1 = null;
    this.fideicomitente.cuentaskycnocuenta2 = null;
    this.fideicomitente.cuentaskyctipocuenta2 = null;
    this.fideicomitente.cuentaskycnocuenta3 = null;
    this.fideicomitente.cuentaskyctipocuenta3 = null;
    this.fideicomitente.cuentaskycnocuenta4 = null;
    this.fideicomitente.cuentaskyctipocuenta4 = null;
  }
}
