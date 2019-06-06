/* PSG  Contratoinversion Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Contratoinversion } from './contratoinversion.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ContratoinversionService {
  private env: any = environment;
  private token: string;
  contratoinversion = new Contratoinversion();

  constructor(private http: Http) {}

  postGuardaContratoinversion(contratoinversion) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/contratoinversion`, contratoinversion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaContratoinversion() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaContratoinversionPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/contratoinversion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaContratoinversion(contratoinversion, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/contratoinversion/` + id, contratoinversion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaContratoinversionPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaContratoinversionPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/contratoinversion?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetContratoinversion(): Contratoinversion {
    this.clear();
    return this.contratoinversion;
  }

  getContratoinversion(): Contratoinversion {
    var contratoinversion: Contratoinversion = {
      fideicomisoId: this.contratoinversion.fideicomisoId,
      fideicomisoItem: this.contratoinversion.fideicomisoItem,
      tipocontrato: this.contratoinversion.tipocontrato,
      tipocontratoItem: this.contratoinversion.tipocontratoItem,
      intermediario: this.contratoinversion.intermediario,
      intermediarioItem: this.contratoinversion.intermediarioItem,
      moneda: this.contratoinversion.moneda,
      monedaItem: this.contratoinversion.monedaItem,
      nombrecontacto1: this.contratoinversion.nombrecontacto1,
      nombrecontacto2: this.contratoinversion.nombrecontacto2,
      resparamliq: this.contratoinversion.resparamliq,
      resparamliqItem: this.contratoinversion.resparamliqItem,
      enviorecursosinv: this.contratoinversion.enviorecursosinv,
      enviorecursosinvItem: this.contratoinversion.enviorecursosinvItem,
      transferenciarecdesinver: this.contratoinversion.transferenciarecdesinver,
      transferenciarecdesinverItem: this.contratoinversion.transferenciarecdesinverItem,
      retenerisr: this.contratoinversion.retenerisr,
      retenerisrItem: this.contratoinversion.retenerisrItem,
      subfisoId: this.contratoinversion.subfisoId,
      subfisoItem: this.contratoinversion.subfisoItem,
      fechavencimiento: this.contratoinversion.fechavencimiento,
      fechavencimientoAux: this.contratoinversion.fechavencimientoAux,
      estatus: this.contratoinversion.estatus,
      estatusItem: this.contratoinversion.estatusItem,
      contratoiversion: this.contratoinversion.contratoiversion,
      contratootrasinst: this.contratoinversion.contratootrasinst,
      contacto1lada: this.contratoinversion.contacto1lada,
      contacto1telefono: this.contratoinversion.contacto1telefono,
      contacto1ext: this.contratoinversion.contacto1ext,
      contacto2lada: this.contratoinversion.contacto2lada,
      contacto2telefono: this.contratoinversion.contacto2telefono,
      contacto2ext: this.contratoinversion.contacto2ext,
      nombre: this.contratoinversion.nombre,
      cuenta: this.contratoinversion.cuenta,
      traspasoentresubfiso: this.contratoinversion.traspasoentresubfiso,
      traspasoentresubfisoItem: this.contratoinversion.traspasoentresubfisoItem,
      fechaapertura: this.contratoinversion.fechaapertura,
      fechaaperturaAux: this.contratoinversion.fechaaperturaAux,
      origenrecursos: this.contratoinversion.origenrecursos,
      origenrecursosItem: this.contratoinversion.origenrecursosItem,
    };
    return contratoinversion;
  }

  setContratoinversion(contratoinversion: Contratoinversion) {
    this.contratoinversion.fideicomisoId = contratoinversion.fideicomisoId;
    this.contratoinversion.fideicomisoItem = contratoinversion.fideicomisoItem;
    this.contratoinversion.tipocontrato = contratoinversion.tipocontrato;
    this.contratoinversion.tipocontratoItem = contratoinversion.tipocontratoItem;
    this.contratoinversion.intermediario = contratoinversion.intermediario;
    this.contratoinversion.intermediarioItem = contratoinversion.intermediarioItem;
    this.contratoinversion.moneda = contratoinversion.moneda;
    this.contratoinversion.monedaItem = contratoinversion.monedaItem;
    this.contratoinversion.nombrecontacto1 = contratoinversion.nombrecontacto1;
    this.contratoinversion.nombrecontacto2 = contratoinversion.nombrecontacto2;
    this.contratoinversion.resparamliq = contratoinversion.resparamliq;
    this.contratoinversion.resparamliqItem = contratoinversion.resparamliqItem;
    this.contratoinversion.enviorecursosinv = contratoinversion.enviorecursosinv;
    this.contratoinversion.enviorecursosinvItem = contratoinversion.enviorecursosinvItem;
    this.contratoinversion.transferenciarecdesinver = contratoinversion.transferenciarecdesinver;
    this.contratoinversion.transferenciarecdesinverItem = contratoinversion.transferenciarecdesinverItem;
    this.contratoinversion.retenerisr = contratoinversion.retenerisr;
    this.contratoinversion.retenerisrItem = contratoinversion.retenerisrItem;
    this.contratoinversion.subfisoId = contratoinversion.subfisoId;
    this.contratoinversion.subfisoItem = contratoinversion.subfisoItem;
    this.contratoinversion.fechavencimiento = contratoinversion.fechavencimiento;
    this.contratoinversion.fechavencimientoAux = contratoinversion.fechavencimientoAux;
    this.contratoinversion.estatus = contratoinversion.estatus;
    this.contratoinversion.estatusItem = contratoinversion.estatusItem;
    this.contratoinversion.contratoiversion = contratoinversion.contratoiversion;
    this.contratoinversion.contratootrasinst = contratoinversion.contratootrasinst;
    this.contratoinversion.contacto1lada = contratoinversion.contacto1lada;
    this.contratoinversion.contacto1telefono = contratoinversion.contacto1telefono;
    this.contratoinversion.contacto1ext = contratoinversion.contacto1ext;
    this.contratoinversion.contacto2lada = contratoinversion.contacto2lada;
    this.contratoinversion.contacto2telefono = contratoinversion.contacto2telefono;
    this.contratoinversion.contacto2ext = contratoinversion.contacto2ext;
    this.contratoinversion.nombre = contratoinversion.nombre;
    this.contratoinversion.cuenta = contratoinversion.cuenta;
    this.contratoinversion.traspasoentresubfiso = contratoinversion.traspasoentresubfiso;
    this.contratoinversion.traspasoentresubfisoItem = contratoinversion.traspasoentresubfisoItem;
    this.contratoinversion.fechaapertura = contratoinversion.fechaapertura;
    this.contratoinversion.fechaaperturaAux = contratoinversion.fechaaperturaAux;
    this.contratoinversion.origenrecursos = contratoinversion.origenrecursos;
    this.contratoinversion.origenrecursosItem = contratoinversion.origenrecursosItem;
  }

  clear() {
    this.contratoinversion.fideicomisoId = null;
    this.contratoinversion.fideicomisoItem = null;
    this.contratoinversion.tipocontrato = null;
    this.contratoinversion.tipocontratoItem = null;
    this.contratoinversion.intermediario = null;
    this.contratoinversion.intermediarioItem = null;
    this.contratoinversion.moneda = null;
    this.contratoinversion.monedaItem = null;
    this.contratoinversion.nombrecontacto1 = null;
    this.contratoinversion.nombrecontacto2 = null;
    this.contratoinversion.resparamliq = null;
    this.contratoinversion.resparamliqItem = null;
    this.contratoinversion.enviorecursosinv = null;
    this.contratoinversion.enviorecursosinvItem = null;
    this.contratoinversion.transferenciarecdesinver = null;
    this.contratoinversion.transferenciarecdesinverItem = null;
    this.contratoinversion.retenerisr = null;
    this.contratoinversion.retenerisrItem = null;
    this.contratoinversion.subfisoId = null;
    this.contratoinversion.subfisoItem = null;
    this.contratoinversion.fechavencimiento = null;
    this.contratoinversion.fechavencimientoAux = null;
    this.contratoinversion.estatus = null;
    this.contratoinversion.estatusItem = null;
    this.contratoinversion.contratoiversion = null;
    this.contratoinversion.contratootrasinst = null;
    this.contratoinversion.contacto1lada = null;
    this.contratoinversion.contacto1telefono = null;
    this.contratoinversion.contacto1ext = null;
    this.contratoinversion.contacto2lada = null;
    this.contratoinversion.contacto2telefono = null;
    this.contratoinversion.contacto2ext = null;
    this.contratoinversion.nombre = null;
    this.contratoinversion.cuenta = null;
    this.contratoinversion.traspasoentresubfiso = null;
    this.contratoinversion.traspasoentresubfisoItem = null;
    this.contratoinversion.fechaapertura = null;
    this.contratoinversion.fechaaperturaAux = null;
    this.contratoinversion.origenrecursos = null;
    this.contratoinversion.origenrecursosItem = null;
  }
}
