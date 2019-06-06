/* PSG  Fideicomisario Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Fideicomisario } from './fideicomisario.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FideicomisarioService {
  private env: any = environment;
  private token: string;
  fideicomisario = new Fideicomisario();

  constructor(private http: Http) {}

  postGuardaFideicomisario(fideicomisario) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/fideicomisario`, fideicomisario, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomisario() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomisarioPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/fideicomisario/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaFideicomisario(fideicomisario, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/fideicomisario/` + id, fideicomisario, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaFideicomisarioPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaFideicomisarioPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/fideicomisario?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetFideicomisario(): Fideicomisario {
    this.clear();
    return this.fideicomisario;
  }

  getFideicomisario(): Fideicomisario {
    var fideicomisario: Fideicomisario = {
      numerofideicomisario: this.fideicomisario.numerofideicomisario,
      tipopersona: this.fideicomisario.tipopersona,
      tipopersonaItem: this.fideicomisario.tipopersonaItem,
      participante: this.fideicomisario.participante,
      fideicomisoId: this.fideicomisario.fideicomisoId,
      fideicomisoItem: this.fideicomisario.fideicomisoItem,
      regimenfiscal: this.fideicomisario.regimenfiscal,
      regimenfiscalItem: this.fideicomisario.regimenfiscalItem,
      generalescontroladorfideicomiso: this.fideicomisario.generalescontroladorfideicomiso,
      generalescontroladorfideicomisoItem: this.fideicomisario.generalescontroladorfideicomisoItem,
      generalesnacionalidad: this.fideicomisario.generalesnacionalidad,
      generalesnacionalidadItem: this.fideicomisario.generalesnacionalidadItem,
      generalespaisorigen: this.fideicomisario.generalespaisorigen,
      generalespaisorigenItem: this.fideicomisario.generalespaisorigenItem,
      generalesactividad: this.fideicomisario.generalesactividad,
      generalesactividadItem: this.fideicomisario.generalesactividadItem,
      generalesaportarecursos: this.fideicomisario.generalesaportarecursos,
      generalesaportarecursosItem: this.fideicomisario.generalesaportarecursosItem,
      generalespaisresidencia: this.fideicomisario.generalespaisresidencia,
      generalespaisresidenciaItem: this.fideicomisario.generalespaisresidenciaItem,
      generalesclientescotiabank: this.fideicomisario.generalesclientescotiabank,
      generalesclientescotiabankItem: this.fideicomisario.generalesclientescotiabankItem,
      generalespep: this.fideicomisario.generalespep,
      generalespepItem: this.fideicomisario.generalespepItem,
      generalesestatus: this.fideicomisario.generalesestatus,
      generalesestatusItem: this.fideicomisario.generalesestatusItem,
      generalesgrupofilial: this.fideicomisario.generalesgrupofilial,
      generalescalidadmigratoria: this.fideicomisario.generalescalidadmigratoria,
      generalescalidadmigratoriaItem: this.fideicomisario.generalescalidadmigratoriaItem,
      generaleslugaroperacion: this.fideicomisario.generaleslugaroperacion,
      generaleslugaroperacionItem: this.fideicomisario.generaleslugaroperacionItem,
      generalesoperacuentaterceros: this.fideicomisario.generalesoperacuentaterceros,
      generalesoperacuentatercerosItem: this.fideicomisario.generalesoperacuentatercerosItem,
      generalesnivelparticipante: this.fideicomisario.generalesnivelparticipante,
      generalesnivelparticipanteItem: this.fideicomisario.generalesnivelparticipanteItem,
      generalesclienterelacionpep: this.fideicomisario.generalesclienterelacionpep,
      generalesclienterelacionpepItem: this.fideicomisario.generalesclienterelacionpepItem,
      generalesgrado: this.fideicomisario.generalesgrado,
      infopldkychonorarios: this.fideicomisario.infopldkychonorarios,
      infopldkyccomisiones: this.fideicomisario.infopldkyccomisiones,
      infopldkyccomisionesItem: this.fideicomisario.infopldkyccomisionesItem,
      infopldkycotros: this.fideicomisario.infopldkycotros,
      infopldkycotrosItem: this.fideicomisario.infopldkycotrosItem,
      infopldkycsueldos: this.fideicomisario.infopldkycsueldos,
      infopldkycsueldosItem: this.fideicomisario.infopldkycsueldosItem,
      infopldkycventa: this.fideicomisario.infopldkycventa,
      infopldkycventaItem: this.fideicomisario.infopldkycventaItem,
      infopldkycinversiones: this.fideicomisario.infopldkycinversiones,
      infopldkycinversionesItem: this.fideicomisario.infopldkycinversionesItem,
      infopldkycarrendamiento: this.fideicomisario.infopldkycarrendamiento,
      infopldkycarrendamientoItem: this.fideicomisario.infopldkycarrendamientoItem,
      infopldkyctipopatrimonio: this.fideicomisario.infopldkyctipopatrimonio,
      infopldkycinstrumento: this.fideicomisario.infopldkycinstrumento,
      infopldkycinstrumentoItem: this.fideicomisario.infopldkycinstrumentoItem,
      infopldkycrazonapertura: this.fideicomisario.infopldkycrazonapertura,
      infopldkyccomentarios: this.fideicomisario.infopldkyccomentarios,
      infopldkycnivelriesgo: this.fideicomisario.infopldkycnivelriesgo,
      infopldkycnivelriesgoItem: this.fideicomisario.infopldkycnivelriesgoItem,
      infopldkycestatuscalculopld: this.fideicomisario.infopldkycestatuscalculopld,
      infopldkycfechaveriffircosoft: this.fideicomisario.infopldkycfechaveriffircosoft,
      infopldkycfechaveriffircosoftAux: this.fideicomisario.infopldkycfechaveriffircosoftAux,
      identificacionrfc: this.fideicomisario.identificacionrfc,
      identificacioncurp: this.fideicomisario.identificacioncurp,
      identificacionnoserieefirma: this.fideicomisario.identificacionnoserieefirma,
      identificacionpaisresidfisc1: this.fideicomisario.identificacionpaisresidfisc1,
      identificacionpaisresidfisc1Item: this.fideicomisario.identificacionpaisresidfisc1Item,
      identificacionpaisresidfisc2: this.fideicomisario.identificacionpaisresidfisc2,
      identificacionpaisresidfisc2Item: this.fideicomisario.identificacionpaisresidfisc2Item,
      identificacionemail: this.fideicomisario.identificacionemail,
      identificacionfechaconstitucion: this.fideicomisario.identificacionfechaconstitucion,
      identificacionfechaconstitucionAux: this.fideicomisario.identificacionfechaconstitucionAux,
      identificacionsexo: this.fideicomisario.identificacionsexo,
      identificacionsexoItem: this.fideicomisario.identificacionsexoItem,
      identificacionpaiscasa: this.fideicomisario.identificacionpaiscasa,
      identificacionpaiscasaItem: this.fideicomisario.identificacionpaiscasaItem,
      identificacionpaisoficina: this.fideicomisario.identificacionpaisoficina,
      identificacionpaisoficinaItem: this.fideicomisario.identificacionpaisoficinaItem,
      identificacionpaiscelular: this.fideicomisario.identificacionpaiscelular,
      identificacionpaiscelularItem: this.fideicomisario.identificacionpaiscelularItem,
      identificacionfechainiciorelneg: this.fideicomisario.identificacionfechainiciorelneg,
      identificacionfechainiciorelnegAux: this.fideicomisario.identificacionfechainiciorelnegAux,
      identificacionnoidentificacion: this.fideicomisario.identificacionnoidentificacion,
      identificacioncomprobaciondomicilio: this.fideicomisario.identificacioncomprobaciondomicilio,
      identificacionactividadempresarial: this.fideicomisario.identificacionactividadempresarial,
      identificacionactividadempresarialItem: this.fideicomisario.identificacionactividadempresarialItem,
      identificacionnoidentfisc1: this.fideicomisario.identificacionnoidentfisc1,
      identificacionnoidentfisc2: this.fideicomisario.identificacionnoidentfisc2,
      identificacionclasificacionfatca: this.fideicomisario.identificacionclasificacionfatca,
      identificacionladacasa: this.fideicomisario.identificacionladacasa,
      identificacionladaoficina: this.fideicomisario.identificacionladaoficina,
      identificacionladacelular: this.fideicomisario.identificacionladacelular,
      identificacionnumerocasa: this.fideicomisario.identificacionnumerocasa,
      identificacionnumerooficina: this.fideicomisario.identificacionnumerooficina,
      identificacionnumerocelular: this.fideicomisario.identificacionnumerocelular,
      identificacionextoficina: this.fideicomisario.identificacionextoficina,
      identificacionextcelular: this.fideicomisario.identificacionextcelular,
      identificacionidentoficialvig: this.fideicomisario.identificacionidentoficialvig,
      identificacionvigencia: this.fideicomisario.identificacionvigencia,
      escrituranoescritura: this.fideicomisario.escrituranoescritura,
      escrituranotario: this.fideicomisario.escrituranotario,
      escrituranotarioItem: this.fideicomisario.escrituranotarioItem,
      escrituranonotaria: this.fideicomisario.escrituranonotaria,
      escrituraciudad: this.fideicomisario.escrituraciudad,
      escrituratelefono: this.fideicomisario.escrituratelefono,
      escrituraemail: this.fideicomisario.escrituraemail,
      escriturafecha: this.fideicomisario.escriturafecha,
      escriturafechaAux: this.fideicomisario.escriturafechaAux,
      escrituraestado: this.fideicomisario.escrituraestado,
      cuentaskycnocuenta1: this.fideicomisario.cuentaskycnocuenta1,
      cuentaskyctipocuenta1: this.fideicomisario.cuentaskyctipocuenta1,
      cuentaskycnocuenta2: this.fideicomisario.cuentaskycnocuenta2,
      cuentaskyctipocuenta2: this.fideicomisario.cuentaskyctipocuenta2,
      cuentaskycnocuenta3: this.fideicomisario.cuentaskycnocuenta3,
      cuentaskyctipocuenta3: this.fideicomisario.cuentaskyctipocuenta3,
      cuentaskycnocuenta4: this.fideicomisario.cuentaskycnocuenta4,
      cuentaskyctipocuenta4: this.fideicomisario.cuentaskyctipocuenta4,
    };
    return fideicomisario;
  }

  setFideicomisario(fideicomisario: Fideicomisario) {
    this.fideicomisario.numerofideicomisario = fideicomisario.numerofideicomisario;
    this.fideicomisario.tipopersona = fideicomisario.tipopersona;
    this.fideicomisario.tipopersonaItem = fideicomisario.tipopersonaItem;
    this.fideicomisario.participante = fideicomisario.participante;
    this.fideicomisario.fideicomisoId = fideicomisario.fideicomisoId;
    this.fideicomisario.fideicomisoItem = fideicomisario.fideicomisoItem;
    this.fideicomisario.regimenfiscal = fideicomisario.regimenfiscal;
    this.fideicomisario.regimenfiscalItem = fideicomisario.regimenfiscalItem;
    this.fideicomisario.generalescontroladorfideicomiso = fideicomisario.generalescontroladorfideicomiso;
    this.fideicomisario.generalescontroladorfideicomisoItem = fideicomisario.generalescontroladorfideicomisoItem;
    this.fideicomisario.generalesnacionalidad = fideicomisario.generalesnacionalidad;
    this.fideicomisario.generalesnacionalidadItem = fideicomisario.generalesnacionalidadItem;
    this.fideicomisario.generalespaisorigen = fideicomisario.generalespaisorigen;
    this.fideicomisario.generalespaisorigenItem = fideicomisario.generalespaisorigenItem;
    this.fideicomisario.generalesactividad = fideicomisario.generalesactividad;
    this.fideicomisario.generalesactividadItem = fideicomisario.generalesactividadItem;
    this.fideicomisario.generalesaportarecursos = fideicomisario.generalesaportarecursos;
    this.fideicomisario.generalesaportarecursosItem = fideicomisario.generalesaportarecursosItem;
    this.fideicomisario.generalespaisresidencia = fideicomisario.generalespaisresidencia;
    this.fideicomisario.generalespaisresidenciaItem = fideicomisario.generalespaisresidenciaItem;
    this.fideicomisario.generalesclientescotiabank = fideicomisario.generalesclientescotiabank;
    this.fideicomisario.generalesclientescotiabankItem = fideicomisario.generalesclientescotiabankItem;
    this.fideicomisario.generalespep = fideicomisario.generalespep;
    this.fideicomisario.generalespepItem = fideicomisario.generalespepItem;
    this.fideicomisario.generalesestatus = fideicomisario.generalesestatus;
    this.fideicomisario.generalesestatusItem = fideicomisario.generalesestatusItem;
    this.fideicomisario.generalesgrupofilial = fideicomisario.generalesgrupofilial;
    this.fideicomisario.generalescalidadmigratoria = fideicomisario.generalescalidadmigratoria;
    this.fideicomisario.generalescalidadmigratoriaItem = fideicomisario.generalescalidadmigratoriaItem;
    this.fideicomisario.generaleslugaroperacion = fideicomisario.generaleslugaroperacion;
    this.fideicomisario.generaleslugaroperacionItem = fideicomisario.generaleslugaroperacionItem;
    this.fideicomisario.generalesoperacuentaterceros = fideicomisario.generalesoperacuentaterceros;
    this.fideicomisario.generalesoperacuentatercerosItem = fideicomisario.generalesoperacuentatercerosItem;
    this.fideicomisario.generalesnivelparticipante = fideicomisario.generalesnivelparticipante;
    this.fideicomisario.generalesnivelparticipanteItem = fideicomisario.generalesnivelparticipanteItem;
    this.fideicomisario.generalesclienterelacionpep = fideicomisario.generalesclienterelacionpep;
    this.fideicomisario.generalesclienterelacionpepItem = fideicomisario.generalesclienterelacionpepItem;
    this.fideicomisario.generalesgrado = fideicomisario.generalesgrado;
    this.fideicomisario.infopldkychonorarios = fideicomisario.infopldkychonorarios;
    this.fideicomisario.infopldkyccomisiones = fideicomisario.infopldkyccomisiones;
    this.fideicomisario.infopldkyccomisionesItem = fideicomisario.infopldkyccomisionesItem;
    this.fideicomisario.infopldkycotros = fideicomisario.infopldkycotros;
    this.fideicomisario.infopldkycotrosItem = fideicomisario.infopldkycotrosItem;
    this.fideicomisario.infopldkycsueldos = fideicomisario.infopldkycsueldos;
    this.fideicomisario.infopldkycsueldosItem = fideicomisario.infopldkycsueldosItem;
    this.fideicomisario.infopldkycventa = fideicomisario.infopldkycventa;
    this.fideicomisario.infopldkycventaItem = fideicomisario.infopldkycventaItem;
    this.fideicomisario.infopldkycinversiones = fideicomisario.infopldkycinversiones;
    this.fideicomisario.infopldkycinversionesItem = fideicomisario.infopldkycinversionesItem;
    this.fideicomisario.infopldkycarrendamiento = fideicomisario.infopldkycarrendamiento;
    this.fideicomisario.infopldkycarrendamientoItem = fideicomisario.infopldkycarrendamientoItem;
    this.fideicomisario.infopldkyctipopatrimonio = fideicomisario.infopldkyctipopatrimonio;
    this.fideicomisario.infopldkycinstrumento = fideicomisario.infopldkycinstrumento;
    this.fideicomisario.infopldkycinstrumentoItem = fideicomisario.infopldkycinstrumentoItem;
    this.fideicomisario.infopldkycrazonapertura = fideicomisario.infopldkycrazonapertura;
    this.fideicomisario.infopldkyccomentarios = fideicomisario.infopldkyccomentarios;
    this.fideicomisario.infopldkycnivelriesgo = fideicomisario.infopldkycnivelriesgo;
    this.fideicomisario.infopldkycnivelriesgoItem = fideicomisario.infopldkycnivelriesgoItem;
    this.fideicomisario.infopldkycestatuscalculopld = fideicomisario.infopldkycestatuscalculopld;
    this.fideicomisario.infopldkycfechaveriffircosoft = fideicomisario.infopldkycfechaveriffircosoft;
    this.fideicomisario.infopldkycfechaveriffircosoftAux = fideicomisario.infopldkycfechaveriffircosoftAux;
    this.fideicomisario.identificacionrfc = fideicomisario.identificacionrfc;
    this.fideicomisario.identificacioncurp = fideicomisario.identificacioncurp;
    this.fideicomisario.identificacionnoserieefirma = fideicomisario.identificacionnoserieefirma;
    this.fideicomisario.identificacionpaisresidfisc1 = fideicomisario.identificacionpaisresidfisc1;
    this.fideicomisario.identificacionpaisresidfisc1Item = fideicomisario.identificacionpaisresidfisc1Item;
    this.fideicomisario.identificacionpaisresidfisc2 = fideicomisario.identificacionpaisresidfisc2;
    this.fideicomisario.identificacionpaisresidfisc2Item = fideicomisario.identificacionpaisresidfisc2Item;
    this.fideicomisario.identificacionemail = fideicomisario.identificacionemail;
    this.fideicomisario.identificacionfechaconstitucion = fideicomisario.identificacionfechaconstitucion;
    this.fideicomisario.identificacionfechaconstitucionAux = fideicomisario.identificacionfechaconstitucionAux;
    this.fideicomisario.identificacionsexo = fideicomisario.identificacionsexo;
    this.fideicomisario.identificacionsexoItem = fideicomisario.identificacionsexoItem;
    this.fideicomisario.identificacionpaiscasa = fideicomisario.identificacionpaiscasa;
    this.fideicomisario.identificacionpaiscasaItem = fideicomisario.identificacionpaiscasaItem;
    this.fideicomisario.identificacionpaisoficina = fideicomisario.identificacionpaisoficina;
    this.fideicomisario.identificacionpaisoficinaItem = fideicomisario.identificacionpaisoficinaItem;
    this.fideicomisario.identificacionpaiscelular = fideicomisario.identificacionpaiscelular;
    this.fideicomisario.identificacionpaiscelularItem = fideicomisario.identificacionpaiscelularItem;
    this.fideicomisario.identificacionfechainiciorelneg = fideicomisario.identificacionfechainiciorelneg;
    this.fideicomisario.identificacionfechainiciorelnegAux = fideicomisario.identificacionfechainiciorelnegAux;
    this.fideicomisario.identificacionnoidentificacion = fideicomisario.identificacionnoidentificacion;
    this.fideicomisario.identificacioncomprobaciondomicilio = fideicomisario.identificacioncomprobaciondomicilio;
    this.fideicomisario.identificacionactividadempresarial = fideicomisario.identificacionactividadempresarial;
    this.fideicomisario.identificacionactividadempresarialItem = fideicomisario.identificacionactividadempresarialItem;
    this.fideicomisario.identificacionnoidentfisc1 = fideicomisario.identificacionnoidentfisc1;
    this.fideicomisario.identificacionnoidentfisc2 = fideicomisario.identificacionnoidentfisc2;
    this.fideicomisario.identificacionclasificacionfatca = fideicomisario.identificacionclasificacionfatca;
    this.fideicomisario.identificacionladacasa = fideicomisario.identificacionladacasa;
    this.fideicomisario.identificacionladaoficina = fideicomisario.identificacionladaoficina;
    this.fideicomisario.identificacionladacelular = fideicomisario.identificacionladacelular;
    this.fideicomisario.identificacionnumerocasa = fideicomisario.identificacionnumerocasa;
    this.fideicomisario.identificacionnumerooficina = fideicomisario.identificacionnumerooficina;
    this.fideicomisario.identificacionnumerocelular = fideicomisario.identificacionnumerocelular;
    this.fideicomisario.identificacionextoficina = fideicomisario.identificacionextoficina;
    this.fideicomisario.identificacionextcelular = fideicomisario.identificacionextcelular;
    this.fideicomisario.identificacionidentoficialvig = fideicomisario.identificacionidentoficialvig;
    this.fideicomisario.identificacionvigencia = fideicomisario.identificacionvigencia;
    this.fideicomisario.escrituranoescritura = fideicomisario.escrituranoescritura;
    this.fideicomisario.escrituranotario = fideicomisario.escrituranotario;
    this.fideicomisario.escrituranotarioItem = fideicomisario.escrituranotarioItem;
    this.fideicomisario.escrituranonotaria = fideicomisario.escrituranonotaria;
    this.fideicomisario.escrituraciudad = fideicomisario.escrituraciudad;
    this.fideicomisario.escrituratelefono = fideicomisario.escrituratelefono;
    this.fideicomisario.escrituraemail = fideicomisario.escrituraemail;
    this.fideicomisario.escriturafecha = fideicomisario.escriturafecha;
    this.fideicomisario.escriturafechaAux = fideicomisario.escriturafechaAux;
    this.fideicomisario.escrituraestado = fideicomisario.escrituraestado;
    this.fideicomisario.cuentaskycnocuenta1 = fideicomisario.cuentaskycnocuenta1;
    this.fideicomisario.cuentaskyctipocuenta1 = fideicomisario.cuentaskyctipocuenta1;
    this.fideicomisario.cuentaskycnocuenta2 = fideicomisario.cuentaskycnocuenta2;
    this.fideicomisario.cuentaskyctipocuenta2 = fideicomisario.cuentaskyctipocuenta2;
    this.fideicomisario.cuentaskycnocuenta3 = fideicomisario.cuentaskycnocuenta3;
    this.fideicomisario.cuentaskyctipocuenta3 = fideicomisario.cuentaskyctipocuenta3;
    this.fideicomisario.cuentaskycnocuenta4 = fideicomisario.cuentaskycnocuenta4;
    this.fideicomisario.cuentaskyctipocuenta4 = fideicomisario.cuentaskyctipocuenta4;
  }

  clear() {
    this.fideicomisario.numerofideicomisario = null;
    this.fideicomisario.tipopersona = null;
    this.fideicomisario.tipopersonaItem = null;
    this.fideicomisario.participante = null;
    this.fideicomisario.fideicomisoId = null;
    this.fideicomisario.fideicomisoItem = null;
    this.fideicomisario.regimenfiscal = null;
    this.fideicomisario.regimenfiscalItem = null;
    this.fideicomisario.generalescontroladorfideicomiso = null;
    this.fideicomisario.generalescontroladorfideicomisoItem = null;
    this.fideicomisario.generalesnacionalidad = null;
    this.fideicomisario.generalesnacionalidadItem = null;
    this.fideicomisario.generalespaisorigen = null;
    this.fideicomisario.generalespaisorigenItem = null;
    this.fideicomisario.generalesactividad = null;
    this.fideicomisario.generalesactividadItem = null;
    this.fideicomisario.generalesaportarecursos = null;
    this.fideicomisario.generalesaportarecursosItem = null;
    this.fideicomisario.generalespaisresidencia = null;
    this.fideicomisario.generalespaisresidenciaItem = null;
    this.fideicomisario.generalesclientescotiabank = null;
    this.fideicomisario.generalesclientescotiabankItem = null;
    this.fideicomisario.generalespep = null;
    this.fideicomisario.generalespepItem = null;
    this.fideicomisario.generalesestatus = null;
    this.fideicomisario.generalesestatusItem = null;
    this.fideicomisario.generalesgrupofilial = null;
    this.fideicomisario.generalescalidadmigratoria = null;
    this.fideicomisario.generalescalidadmigratoriaItem = null;
    this.fideicomisario.generaleslugaroperacion = null;
    this.fideicomisario.generaleslugaroperacionItem = null;
    this.fideicomisario.generalesoperacuentaterceros = null;
    this.fideicomisario.generalesoperacuentatercerosItem = null;
    this.fideicomisario.generalesnivelparticipante = null;
    this.fideicomisario.generalesnivelparticipanteItem = null;
    this.fideicomisario.generalesclienterelacionpep = null;
    this.fideicomisario.generalesclienterelacionpepItem = null;
    this.fideicomisario.generalesgrado = null;
    this.fideicomisario.infopldkychonorarios = null;
    this.fideicomisario.infopldkyccomisiones = null;
    this.fideicomisario.infopldkyccomisionesItem = null;
    this.fideicomisario.infopldkycotros = null;
    this.fideicomisario.infopldkycotrosItem = null;
    this.fideicomisario.infopldkycsueldos = null;
    this.fideicomisario.infopldkycsueldosItem = null;
    this.fideicomisario.infopldkycventa = null;
    this.fideicomisario.infopldkycventaItem = null;
    this.fideicomisario.infopldkycinversiones = null;
    this.fideicomisario.infopldkycinversionesItem = null;
    this.fideicomisario.infopldkycarrendamiento = null;
    this.fideicomisario.infopldkycarrendamientoItem = null;
    this.fideicomisario.infopldkyctipopatrimonio = null;
    this.fideicomisario.infopldkycinstrumento = null;
    this.fideicomisario.infopldkycinstrumentoItem = null;
    this.fideicomisario.infopldkycrazonapertura = null;
    this.fideicomisario.infopldkyccomentarios = null;
    this.fideicomisario.infopldkycnivelriesgo = null;
    this.fideicomisario.infopldkycnivelriesgoItem = null;
    this.fideicomisario.infopldkycestatuscalculopld = null;
    this.fideicomisario.infopldkycfechaveriffircosoft = null;
    this.fideicomisario.infopldkycfechaveriffircosoftAux = null;
    this.fideicomisario.identificacionrfc = null;
    this.fideicomisario.identificacioncurp = null;
    this.fideicomisario.identificacionnoserieefirma = null;
    this.fideicomisario.identificacionpaisresidfisc1 = null;
    this.fideicomisario.identificacionpaisresidfisc1Item = null;
    this.fideicomisario.identificacionpaisresidfisc2 = null;
    this.fideicomisario.identificacionpaisresidfisc2Item = null;
    this.fideicomisario.identificacionemail = null;
    this.fideicomisario.identificacionfechaconstitucion = null;
    this.fideicomisario.identificacionfechaconstitucionAux = null;
    this.fideicomisario.identificacionsexo = null;
    this.fideicomisario.identificacionsexoItem = null;
    this.fideicomisario.identificacionpaiscasa = null;
    this.fideicomisario.identificacionpaiscasaItem = null;
    this.fideicomisario.identificacionpaisoficina = null;
    this.fideicomisario.identificacionpaisoficinaItem = null;
    this.fideicomisario.identificacionpaiscelular = null;
    this.fideicomisario.identificacionpaiscelularItem = null;
    this.fideicomisario.identificacionfechainiciorelneg = null;
    this.fideicomisario.identificacionfechainiciorelnegAux = null;
    this.fideicomisario.identificacionnoidentificacion = null;
    this.fideicomisario.identificacioncomprobaciondomicilio = null;
    this.fideicomisario.identificacionactividadempresarial = null;
    this.fideicomisario.identificacionactividadempresarialItem = null;
    this.fideicomisario.identificacionnoidentfisc1 = null;
    this.fideicomisario.identificacionnoidentfisc2 = null;
    this.fideicomisario.identificacionclasificacionfatca = null;
    this.fideicomisario.identificacionladacasa = null;
    this.fideicomisario.identificacionladaoficina = null;
    this.fideicomisario.identificacionladacelular = null;
    this.fideicomisario.identificacionnumerocasa = null;
    this.fideicomisario.identificacionnumerooficina = null;
    this.fideicomisario.identificacionnumerocelular = null;
    this.fideicomisario.identificacionextoficina = null;
    this.fideicomisario.identificacionextcelular = null;
    this.fideicomisario.identificacionidentoficialvig = null;
    this.fideicomisario.identificacionvigencia = null;
    this.fideicomisario.escrituranoescritura = null;
    this.fideicomisario.escrituranotario = null;
    this.fideicomisario.escrituranotarioItem = null;
    this.fideicomisario.escrituranonotaria = null;
    this.fideicomisario.escrituraciudad = null;
    this.fideicomisario.escrituratelefono = null;
    this.fideicomisario.escrituraemail = null;
    this.fideicomisario.escriturafecha = null;
    this.fideicomisario.escriturafechaAux = null;
    this.fideicomisario.escrituraestado = null;
    this.fideicomisario.cuentaskycnocuenta1 = null;
    this.fideicomisario.cuentaskyctipocuenta1 = null;
    this.fideicomisario.cuentaskycnocuenta2 = null;
    this.fideicomisario.cuentaskyctipocuenta2 = null;
    this.fideicomisario.cuentaskycnocuenta3 = null;
    this.fideicomisario.cuentaskyctipocuenta3 = null;
    this.fideicomisario.cuentaskycnocuenta4 = null;
    this.fideicomisario.cuentaskyctipocuenta4 = null;
  }
}
