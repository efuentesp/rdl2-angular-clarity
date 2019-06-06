/* PSG  Documentosfideicomiso Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Documentosfideicomiso } from './documentosfideicomiso.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DocumentosfideicomisoService {
  private env: any = environment;
  private token: string;
  documentosfideicomiso = new Documentosfideicomiso();

  constructor(private http: Http) {}

  postGuardaDocumentosfideicomiso(documentosfideicomiso) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/documentosfideicomiso`, documentosfideicomiso, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaDocumentosfideicomiso() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaDocumentosfideicomisoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/documentosfideicomiso/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaDocumentosfideicomiso(documentosfideicomiso, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/documentosfideicomiso/` + id, documentosfideicomiso, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaDocumentosfideicomisoPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaDocumentosfideicomisoPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/documentosfideicomiso?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetDocumentosfideicomiso(): Documentosfideicomiso {
    this.clear();
    return this.documentosfideicomiso;
  }

  getDocumentosfideicomiso(): Documentosfideicomiso {
    var documentosfideicomiso: Documentosfideicomiso = {
      campo: this.documentosfideicomiso.campo,
      fideicomisoId: this.documentosfideicomiso.fideicomisoId,
      fideicomisoItem: this.documentosfideicomiso.fideicomisoItem,
      contratofideicomiso: this.documentosfideicomiso.contratofideicomiso,
      contratofideicomisoItem: this.documentosfideicomiso.contratofideicomisoItem,
      actasconstitutivas: this.documentosfideicomiso.actasconstitutivas,
      actasconstitutivasItem: this.documentosfideicomiso.actasconstitutivasItem,
      cedulafiscal: this.documentosfideicomiso.cedulafiscal,
      cedulafiscalItem: this.documentosfideicomiso.cedulafiscalItem,
      poderes: this.documentosfideicomiso.poderes,
      poderesItem: this.documentosfideicomiso.poderesItem,
      identificadores: this.documentosfideicomiso.identificadores,
      identificadoresItem: this.documentosfideicomiso.identificadoresItem,
      comprobantesdomicilio: this.documentosfideicomiso.comprobantesdomicilio,
      comprobantesdomicilioItem: this.documentosfideicomiso.comprobantesdomicilioItem,
      formatoskyc: this.documentosfideicomiso.formatoskyc,
      formatoskycItem: this.documentosfideicomiso.formatoskycItem,
      formatoevaluacionriesgo: this.documentosfideicomiso.formatoevaluacionriesgo,
      formatoevaluacionriesgoItem: this.documentosfideicomiso.formatoevaluacionriesgoItem,
      worldcheck: this.documentosfideicomiso.worldcheck,
      worldcheckItem: this.documentosfideicomiso.worldcheckItem,
      formatoinformacion: this.documentosfideicomiso.formatoinformacion,
      formatoinformacionItem: this.documentosfideicomiso.formatoinformacionItem,
      autorizacioncomite: this.documentosfideicomiso.autorizacioncomite,
      autorizacioncomiteItem: this.documentosfideicomiso.autorizacioncomiteItem,
      firmascomite: this.documentosfideicomiso.firmascomite,
      firmascomiteItem: this.documentosfideicomiso.firmascomiteItem,
      curp: this.documentosfideicomiso.curp,
      curpItem: this.documentosfideicomiso.curpItem,
    };
    return documentosfideicomiso;
  }

  setDocumentosfideicomiso(documentosfideicomiso: Documentosfideicomiso) {
    this.documentosfideicomiso.campo = documentosfideicomiso.campo;
    this.documentosfideicomiso.fideicomisoId = documentosfideicomiso.fideicomisoId;
    this.documentosfideicomiso.fideicomisoItem = documentosfideicomiso.fideicomisoItem;
    this.documentosfideicomiso.contratofideicomiso = documentosfideicomiso.contratofideicomiso;
    this.documentosfideicomiso.contratofideicomisoItem = documentosfideicomiso.contratofideicomisoItem;
    this.documentosfideicomiso.actasconstitutivas = documentosfideicomiso.actasconstitutivas;
    this.documentosfideicomiso.actasconstitutivasItem = documentosfideicomiso.actasconstitutivasItem;
    this.documentosfideicomiso.cedulafiscal = documentosfideicomiso.cedulafiscal;
    this.documentosfideicomiso.cedulafiscalItem = documentosfideicomiso.cedulafiscalItem;
    this.documentosfideicomiso.poderes = documentosfideicomiso.poderes;
    this.documentosfideicomiso.poderesItem = documentosfideicomiso.poderesItem;
    this.documentosfideicomiso.identificadores = documentosfideicomiso.identificadores;
    this.documentosfideicomiso.identificadoresItem = documentosfideicomiso.identificadoresItem;
    this.documentosfideicomiso.comprobantesdomicilio = documentosfideicomiso.comprobantesdomicilio;
    this.documentosfideicomiso.comprobantesdomicilioItem = documentosfideicomiso.comprobantesdomicilioItem;
    this.documentosfideicomiso.formatoskyc = documentosfideicomiso.formatoskyc;
    this.documentosfideicomiso.formatoskycItem = documentosfideicomiso.formatoskycItem;
    this.documentosfideicomiso.formatoevaluacionriesgo = documentosfideicomiso.formatoevaluacionriesgo;
    this.documentosfideicomiso.formatoevaluacionriesgoItem = documentosfideicomiso.formatoevaluacionriesgoItem;
    this.documentosfideicomiso.worldcheck = documentosfideicomiso.worldcheck;
    this.documentosfideicomiso.worldcheckItem = documentosfideicomiso.worldcheckItem;
    this.documentosfideicomiso.formatoinformacion = documentosfideicomiso.formatoinformacion;
    this.documentosfideicomiso.formatoinformacionItem = documentosfideicomiso.formatoinformacionItem;
    this.documentosfideicomiso.autorizacioncomite = documentosfideicomiso.autorizacioncomite;
    this.documentosfideicomiso.autorizacioncomiteItem = documentosfideicomiso.autorizacioncomiteItem;
    this.documentosfideicomiso.firmascomite = documentosfideicomiso.firmascomite;
    this.documentosfideicomiso.firmascomiteItem = documentosfideicomiso.firmascomiteItem;
    this.documentosfideicomiso.curp = documentosfideicomiso.curp;
    this.documentosfideicomiso.curpItem = documentosfideicomiso.curpItem;
  }

  clear() {
    this.documentosfideicomiso.campo = null;
    this.documentosfideicomiso.fideicomisoId = null;
    this.documentosfideicomiso.fideicomisoItem = null;
    this.documentosfideicomiso.contratofideicomiso = null;
    this.documentosfideicomiso.contratofideicomisoItem = null;
    this.documentosfideicomiso.actasconstitutivas = null;
    this.documentosfideicomiso.actasconstitutivasItem = null;
    this.documentosfideicomiso.cedulafiscal = null;
    this.documentosfideicomiso.cedulafiscalItem = null;
    this.documentosfideicomiso.poderes = null;
    this.documentosfideicomiso.poderesItem = null;
    this.documentosfideicomiso.identificadores = null;
    this.documentosfideicomiso.identificadoresItem = null;
    this.documentosfideicomiso.comprobantesdomicilio = null;
    this.documentosfideicomiso.comprobantesdomicilioItem = null;
    this.documentosfideicomiso.formatoskyc = null;
    this.documentosfideicomiso.formatoskycItem = null;
    this.documentosfideicomiso.formatoevaluacionriesgo = null;
    this.documentosfideicomiso.formatoevaluacionriesgoItem = null;
    this.documentosfideicomiso.worldcheck = null;
    this.documentosfideicomiso.worldcheckItem = null;
    this.documentosfideicomiso.formatoinformacion = null;
    this.documentosfideicomiso.formatoinformacionItem = null;
    this.documentosfideicomiso.autorizacioncomite = null;
    this.documentosfideicomiso.autorizacioncomiteItem = null;
    this.documentosfideicomiso.firmascomite = null;
    this.documentosfideicomiso.firmascomiteItem = null;
    this.documentosfideicomiso.curp = null;
    this.documentosfideicomiso.curpItem = null;
  }
}
