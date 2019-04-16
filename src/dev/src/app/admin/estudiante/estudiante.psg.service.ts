/* PSG  Estudiante Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Estudiante } from './estudiante.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EstudianteService {
  private env: any = environment;
  private token: string;
  estudiante = new Estudiante();

  constructor(private http: Http) {}

  postGuardaEstudiante(estudiante) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/admincontenido/estudiante`, estudiante, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEstudiante() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEstudiantePorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteEstudiante(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/admincontenido/estudiante/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaEstudiante(estudiante, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/admincontenido/estudiante/` + id, estudiante, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEstudiantePorOpcion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?opcionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorPregunta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?preguntaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorExamen(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?examenId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorPublicacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?publicacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorPrograma(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?programaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorGrupoa(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?grupoaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorRecurso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?recursoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorUnidad(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?unidadId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorCertificacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?certificacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorProfesor(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?profesorId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorRegistro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?registroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorInstitucion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?institucionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEstudiantePorEvento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/estudiante?eventoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetEstudiante(): Estudiante {
    this.clear();
    return this.estudiante;
  }

  getEstudiante(): Estudiante {
    var estudiante: Estudiante = {
      concierneporId: this.estudiante.concierneporId,
      concierneporItem: this.estudiante.concierneporItem,
      matricula: this.estudiante.matricula,
      nombreestudiante: this.estudiante.nombreestudiante,
      apellidopaterno: this.estudiante.apellidopaterno,
      fechanacimiento: this.estudiante.fechanacimiento,
      fechanacimientoAux: this.estudiante.fechanacimientoAux,
      genero: this.estudiante.genero,
      generoItem: this.estudiante.generoItem,
      tiponivel: this.estudiante.tiponivel,
      tiponivelItem: this.estudiante.tiponivelItem,
      tipoarea: this.estudiante.tipoarea,
      tipoareaItem: this.estudiante.tipoareaItem,
      correoest: this.estudiante.correoest,
      telefono: this.estudiante.telefono,
    };
    return estudiante;
  }

  setEstudiante(estudiante: Estudiante) {
    this.estudiante.concierneporId = estudiante.concierneporId;
    this.estudiante.concierneporItem = estudiante.concierneporItem;
    this.estudiante.matricula = estudiante.matricula;
    this.estudiante.nombreestudiante = estudiante.nombreestudiante;
    this.estudiante.apellidopaterno = estudiante.apellidopaterno;
    this.estudiante.fechanacimiento = estudiante.fechanacimiento;
    this.estudiante.fechanacimientoAux = estudiante.fechanacimientoAux;
    this.estudiante.genero = estudiante.genero;
    this.estudiante.generoItem = estudiante.generoItem;
    this.estudiante.tiponivel = estudiante.tiponivel;
    this.estudiante.tiponivelItem = estudiante.tiponivelItem;
    this.estudiante.tipoarea = estudiante.tipoarea;
    this.estudiante.tipoareaItem = estudiante.tipoareaItem;
    this.estudiante.correoest = estudiante.correoest;
    this.estudiante.telefono = estudiante.telefono;
  }

  clear() {
    this.estudiante.concierneporId = null;
    this.estudiante.concierneporItem = null;
    this.estudiante.matricula = null;
    this.estudiante.nombreestudiante = null;
    this.estudiante.apellidopaterno = null;
    this.estudiante.fechanacimiento = null;
    this.estudiante.fechanacimientoAux = null;
    this.estudiante.genero = null;
    this.estudiante.generoItem = null;
    this.estudiante.tiponivel = null;
    this.estudiante.tiponivelItem = null;
    this.estudiante.tipoarea = null;
    this.estudiante.tipoareaItem = null;
    this.estudiante.correoest = null;
    this.estudiante.telefono = null;
  }
}
