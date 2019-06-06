/* PSG  Evaluacionriesgos Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Evaluacionriesgos } from './evaluacionriesgos.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EvaluacionriesgosService {
  private env: any = environment;
  private token: string;
  evaluacionriesgos = new Evaluacionriesgos();

  constructor(private http: Http) {}

  postGuardaEvaluacionriesgos(evaluacionriesgos) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/evaluacionriesgos`, evaluacionriesgos, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEvaluacionriesgos() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEvaluacionriesgosPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/evaluacionriesgos/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaEvaluacionriesgos(evaluacionriesgos, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/evaluacionriesgos/` + id, evaluacionriesgos, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEvaluacionriesgosPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEvaluacionriesgosPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/evaluacionriesgos?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetEvaluacionriesgos(): Evaluacionriesgos {
    this.clear();
    return this.evaluacionriesgos;
  }

  getEvaluacionriesgos(): Evaluacionriesgos {
    var evaluacionriesgos: Evaluacionriesgos = {
      campo: this.evaluacionriesgos.campo,
      fideicomisoId: this.evaluacionriesgos.fideicomisoId,
      fideicomisoItem: this.evaluacionriesgos.fideicomisoItem,
      cliente: this.evaluacionriesgos.cliente,
      clienteItem: this.evaluacionriesgos.clienteItem,
      estructura: this.evaluacionriesgos.estructura,
      estructuraItem: this.evaluacionriesgos.estructuraItem,
      resultadofinal: this.evaluacionriesgos.resultadofinal,
      resultadofinalItem: this.evaluacionriesgos.resultadofinalItem,
    };
    return evaluacionriesgos;
  }

  setEvaluacionriesgos(evaluacionriesgos: Evaluacionriesgos) {
    this.evaluacionriesgos.campo = evaluacionriesgos.campo;
    this.evaluacionriesgos.fideicomisoId = evaluacionriesgos.fideicomisoId;
    this.evaluacionriesgos.fideicomisoItem = evaluacionriesgos.fideicomisoItem;
    this.evaluacionriesgos.cliente = evaluacionriesgos.cliente;
    this.evaluacionriesgos.clienteItem = evaluacionriesgos.clienteItem;
    this.evaluacionriesgos.estructura = evaluacionriesgos.estructura;
    this.evaluacionriesgos.estructuraItem = evaluacionriesgos.estructuraItem;
    this.evaluacionriesgos.resultadofinal = evaluacionriesgos.resultadofinal;
    this.evaluacionriesgos.resultadofinalItem = evaluacionriesgos.resultadofinalItem;
  }

  clear() {
    this.evaluacionriesgos.campo = null;
    this.evaluacionriesgos.fideicomisoId = null;
    this.evaluacionriesgos.fideicomisoItem = null;
    this.evaluacionriesgos.cliente = null;
    this.evaluacionriesgos.clienteItem = null;
    this.evaluacionriesgos.estructura = null;
    this.evaluacionriesgos.estructuraItem = null;
    this.evaluacionriesgos.resultadofinal = null;
    this.evaluacionriesgos.resultadofinalItem = null;
  }
}
