/* PSG  Comitetecnico Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comitetecnico } from './comitetecnico.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ComitetecnicoService {
  private env: any = environment;
  private token: string;
  comitetecnico = new Comitetecnico();

  constructor(private http: Http) {}

  postGuardaComitetecnico(comitetecnico) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/comitetecnico`, comitetecnico, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaComitetecnico() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaComitetecnicoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/comitetecnico/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaComitetecnico(comitetecnico, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/comitetecnico/` + id, comitetecnico, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaComitetecnicoPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaComitetecnicoPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/comitetecnico?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetComitetecnico(): Comitetecnico {
    this.clear();
    return this.comitetecnico;
  }

  getComitetecnico(): Comitetecnico {
    var comitetecnico: Comitetecnico = {
      fideicomisoId: this.comitetecnico.fideicomisoId,
      fideicomisoItem: this.comitetecnico.fideicomisoItem,
      nombre: this.comitetecnico.nombre,
      integracion: this.comitetecnico.integracion,
      facultades: this.comitetecnico.facultades,
      comentarios: this.comitetecnico.comentarios,
      fechaconstitucion: this.comitetecnico.fechaconstitucion,
      fechaconstitucionAux: this.comitetecnico.fechaconstitucionAux,
      miembrosquorum: this.comitetecnico.miembrosquorum,
      estatus: this.comitetecnico.estatus,
      estatusItem: this.comitetecnico.estatusItem,
      nombrepresidentepropietario: this.comitetecnico.nombrepresidentepropietario,
      rfcpresidentepropietario: this.comitetecnico.rfcpresidentepropietario,
      nacionalidadpresidentepropietario: this.comitetecnico.nacionalidadpresidentepropietario,
      nacionalidadpresidentepropietarioItem: this.comitetecnico.nacionalidadpresidentepropietarioItem,
      peppresidentepropietario: this.comitetecnico.peppresidentepropietario,
      peppresidentepropietarioItem: this.comitetecnico.peppresidentepropietarioItem,
      nombrepresidentesuplente: this.comitetecnico.nombrepresidentesuplente,
      rfcpresidentesuplente: this.comitetecnico.rfcpresidentesuplente,
      nacionalidadpresidentesuplente: this.comitetecnico.nacionalidadpresidentesuplente,
      nacionalidadpresidentesuplenteItem: this.comitetecnico.nacionalidadpresidentesuplenteItem,
      peppresidentesuplente: this.comitetecnico.peppresidentesuplente,
      peppresidentesuplenteItem: this.comitetecnico.peppresidentesuplenteItem,
      nombresecretariopropietario: this.comitetecnico.nombresecretariopropietario,
      rfcsecretariopropietario: this.comitetecnico.rfcsecretariopropietario,
      nacionalidadsecretariopropietario: this.comitetecnico.nacionalidadsecretariopropietario,
      nacionalidadsecretariopropietarioItem: this.comitetecnico.nacionalidadsecretariopropietarioItem,
      pepsecretariopropietario: this.comitetecnico.pepsecretariopropietario,
      pepsecretariopropietarioItem: this.comitetecnico.pepsecretariopropietarioItem,
      nombresecretariosuplente: this.comitetecnico.nombresecretariosuplente,
      rfcsecretariosuplente: this.comitetecnico.rfcsecretariosuplente,
      nacionalidadsecretariosuplente: this.comitetecnico.nacionalidadsecretariosuplente,
      nacionalidadsecretariosuplenteItem: this.comitetecnico.nacionalidadsecretariosuplenteItem,
      pepsecretariosuplente: this.comitetecnico.pepsecretariosuplente,
      pepsecretariosuplenteItem: this.comitetecnico.pepsecretariosuplenteItem,
      nombrevocalpropietario: this.comitetecnico.nombrevocalpropietario,
      rfcvocalpropietario: this.comitetecnico.rfcvocalpropietario,
      nacionalidadvocalpropietario: this.comitetecnico.nacionalidadvocalpropietario,
      nacionalidadvocalpropietarioItem: this.comitetecnico.nacionalidadvocalpropietarioItem,
      pepvocalpropietario: this.comitetecnico.pepvocalpropietario,
      pepvocalpropietarioItem: this.comitetecnico.pepvocalpropietarioItem,
      nombrevocalsuplente: this.comitetecnico.nombrevocalsuplente,
      rfcvocalsuplente: this.comitetecnico.rfcvocalsuplente,
      nacionalidadvocalsuplente: this.comitetecnico.nacionalidadvocalsuplente,
      nacionalidadvocalsuplenteItem: this.comitetecnico.nacionalidadvocalsuplenteItem,
      pepvocalsuplente: this.comitetecnico.pepvocalsuplente,
      pepvocalsuplenteItem: this.comitetecnico.pepvocalsuplenteItem,
    };
    return comitetecnico;
  }

  setComitetecnico(comitetecnico: Comitetecnico) {
    this.comitetecnico.fideicomisoId = comitetecnico.fideicomisoId;
    this.comitetecnico.fideicomisoItem = comitetecnico.fideicomisoItem;
    this.comitetecnico.nombre = comitetecnico.nombre;
    this.comitetecnico.integracion = comitetecnico.integracion;
    this.comitetecnico.facultades = comitetecnico.facultades;
    this.comitetecnico.comentarios = comitetecnico.comentarios;
    this.comitetecnico.fechaconstitucion = comitetecnico.fechaconstitucion;
    this.comitetecnico.fechaconstitucionAux = comitetecnico.fechaconstitucionAux;
    this.comitetecnico.miembrosquorum = comitetecnico.miembrosquorum;
    this.comitetecnico.estatus = comitetecnico.estatus;
    this.comitetecnico.estatusItem = comitetecnico.estatusItem;
    this.comitetecnico.nombrepresidentepropietario = comitetecnico.nombrepresidentepropietario;
    this.comitetecnico.rfcpresidentepropietario = comitetecnico.rfcpresidentepropietario;
    this.comitetecnico.nacionalidadpresidentepropietario = comitetecnico.nacionalidadpresidentepropietario;
    this.comitetecnico.nacionalidadpresidentepropietarioItem = comitetecnico.nacionalidadpresidentepropietarioItem;
    this.comitetecnico.peppresidentepropietario = comitetecnico.peppresidentepropietario;
    this.comitetecnico.peppresidentepropietarioItem = comitetecnico.peppresidentepropietarioItem;
    this.comitetecnico.nombrepresidentesuplente = comitetecnico.nombrepresidentesuplente;
    this.comitetecnico.rfcpresidentesuplente = comitetecnico.rfcpresidentesuplente;
    this.comitetecnico.nacionalidadpresidentesuplente = comitetecnico.nacionalidadpresidentesuplente;
    this.comitetecnico.nacionalidadpresidentesuplenteItem = comitetecnico.nacionalidadpresidentesuplenteItem;
    this.comitetecnico.peppresidentesuplente = comitetecnico.peppresidentesuplente;
    this.comitetecnico.peppresidentesuplenteItem = comitetecnico.peppresidentesuplenteItem;
    this.comitetecnico.nombresecretariopropietario = comitetecnico.nombresecretariopropietario;
    this.comitetecnico.rfcsecretariopropietario = comitetecnico.rfcsecretariopropietario;
    this.comitetecnico.nacionalidadsecretariopropietario = comitetecnico.nacionalidadsecretariopropietario;
    this.comitetecnico.nacionalidadsecretariopropietarioItem = comitetecnico.nacionalidadsecretariopropietarioItem;
    this.comitetecnico.pepsecretariopropietario = comitetecnico.pepsecretariopropietario;
    this.comitetecnico.pepsecretariopropietarioItem = comitetecnico.pepsecretariopropietarioItem;
    this.comitetecnico.nombresecretariosuplente = comitetecnico.nombresecretariosuplente;
    this.comitetecnico.rfcsecretariosuplente = comitetecnico.rfcsecretariosuplente;
    this.comitetecnico.nacionalidadsecretariosuplente = comitetecnico.nacionalidadsecretariosuplente;
    this.comitetecnico.nacionalidadsecretariosuplenteItem = comitetecnico.nacionalidadsecretariosuplenteItem;
    this.comitetecnico.pepsecretariosuplente = comitetecnico.pepsecretariosuplente;
    this.comitetecnico.pepsecretariosuplenteItem = comitetecnico.pepsecretariosuplenteItem;
    this.comitetecnico.nombrevocalpropietario = comitetecnico.nombrevocalpropietario;
    this.comitetecnico.rfcvocalpropietario = comitetecnico.rfcvocalpropietario;
    this.comitetecnico.nacionalidadvocalpropietario = comitetecnico.nacionalidadvocalpropietario;
    this.comitetecnico.nacionalidadvocalpropietarioItem = comitetecnico.nacionalidadvocalpropietarioItem;
    this.comitetecnico.pepvocalpropietario = comitetecnico.pepvocalpropietario;
    this.comitetecnico.pepvocalpropietarioItem = comitetecnico.pepvocalpropietarioItem;
    this.comitetecnico.nombrevocalsuplente = comitetecnico.nombrevocalsuplente;
    this.comitetecnico.rfcvocalsuplente = comitetecnico.rfcvocalsuplente;
    this.comitetecnico.nacionalidadvocalsuplente = comitetecnico.nacionalidadvocalsuplente;
    this.comitetecnico.nacionalidadvocalsuplenteItem = comitetecnico.nacionalidadvocalsuplenteItem;
    this.comitetecnico.pepvocalsuplente = comitetecnico.pepvocalsuplente;
    this.comitetecnico.pepvocalsuplenteItem = comitetecnico.pepvocalsuplenteItem;
  }

  clear() {
    this.comitetecnico.fideicomisoId = null;
    this.comitetecnico.fideicomisoItem = null;
    this.comitetecnico.nombre = null;
    this.comitetecnico.integracion = null;
    this.comitetecnico.facultades = null;
    this.comitetecnico.comentarios = null;
    this.comitetecnico.fechaconstitucion = null;
    this.comitetecnico.fechaconstitucionAux = null;
    this.comitetecnico.miembrosquorum = null;
    this.comitetecnico.estatus = null;
    this.comitetecnico.estatusItem = null;
    this.comitetecnico.nombrepresidentepropietario = null;
    this.comitetecnico.rfcpresidentepropietario = null;
    this.comitetecnico.nacionalidadpresidentepropietario = null;
    this.comitetecnico.nacionalidadpresidentepropietarioItem = null;
    this.comitetecnico.peppresidentepropietario = null;
    this.comitetecnico.peppresidentepropietarioItem = null;
    this.comitetecnico.nombrepresidentesuplente = null;
    this.comitetecnico.rfcpresidentesuplente = null;
    this.comitetecnico.nacionalidadpresidentesuplente = null;
    this.comitetecnico.nacionalidadpresidentesuplenteItem = null;
    this.comitetecnico.peppresidentesuplente = null;
    this.comitetecnico.peppresidentesuplenteItem = null;
    this.comitetecnico.nombresecretariopropietario = null;
    this.comitetecnico.rfcsecretariopropietario = null;
    this.comitetecnico.nacionalidadsecretariopropietario = null;
    this.comitetecnico.nacionalidadsecretariopropietarioItem = null;
    this.comitetecnico.pepsecretariopropietario = null;
    this.comitetecnico.pepsecretariopropietarioItem = null;
    this.comitetecnico.nombresecretariosuplente = null;
    this.comitetecnico.rfcsecretariosuplente = null;
    this.comitetecnico.nacionalidadsecretariosuplente = null;
    this.comitetecnico.nacionalidadsecretariosuplenteItem = null;
    this.comitetecnico.pepsecretariosuplente = null;
    this.comitetecnico.pepsecretariosuplenteItem = null;
    this.comitetecnico.nombrevocalpropietario = null;
    this.comitetecnico.rfcvocalpropietario = null;
    this.comitetecnico.nacionalidadvocalpropietario = null;
    this.comitetecnico.nacionalidadvocalpropietarioItem = null;
    this.comitetecnico.pepvocalpropietario = null;
    this.comitetecnico.pepvocalpropietarioItem = null;
    this.comitetecnico.nombrevocalsuplente = null;
    this.comitetecnico.rfcvocalsuplente = null;
    this.comitetecnico.nacionalidadvocalsuplente = null;
    this.comitetecnico.nacionalidadvocalsuplenteItem = null;
    this.comitetecnico.pepvocalsuplente = null;
    this.comitetecnico.pepvocalsuplenteItem = null;
  }
}
