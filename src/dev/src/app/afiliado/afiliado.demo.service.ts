import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Afiliado } from './afiliado.demo.model';
import { environment } from '../../environments/environment';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class AfiliadoService {
  private env: any = environment;
  private afiliado = new Afiliado();

  constructor(private http: Http) {}

  postGuardaAfiliado(afiliado) {
    return this.http.post(this.env.api + '/afiliado', afiliado).pipe(map(res => res));
  }

  getRecuperaAfiliados() {
    return this.http.get(this.env.api + '/afiliado').pipe(map(res => res.json()));
  }

  getRecuperaAfiliadoPorId(id) {
    return this.http.get(this.env.api + '/afiliado/' + id).pipe(map(res => res.json()));
  }

  deleteAfiliado(afiliado) {
    return this.http.delete(this.env.api + '/afiliado/' + afiliado.id).pipe(map(res => res));
  }

  updateEditaAfiliado(afiliado) {
    return this.http.put(this.env.api + '/afiliado/' + afiliado.id, afiliado).pipe(map(res => res));
  }

  resetAfiliado(): Afiliado {
    this.clear();
    return this.afiliado;
  }

  getAfiliado(): Afiliado {
    var afiliado: Afiliado = {
      id: this.afiliado.id,
      nss: this.afiliado.nss,
      actanacimiento: this.afiliado.actanacimiento,
      apellidomaterno: this.afiliado.apellidomaterno,
      apellidopaterno: this.afiliado.apellidopaterno,
      beneficiario1Id: this.afiliado.beneficiario1Id,
      beneficiario1Item: this.afiliado.beneficiario1Item,
      correo: this.afiliado.correo,
      fechaafiliacion: this.afiliado.fechaafiliacion,
      foto: this.afiliado.foto,
      genero1Id: this.afiliado.genero1Id,
      genero1Item: this.afiliado.genero1Item,
      nombre: this.afiliado.nombre,
      numero: this.afiliado.numero,
      observaciones: this.afiliado.observaciones,
      semanascotizadas: this.afiliado.semanascotizadas,
      nivel: this.afiliado.nivel,
      orders: this.afiliado.orders,
    };
    return afiliado;
  }

  setAfiliado(afiliado: Afiliado) {
    (this.afiliado.id = afiliado.id),
      (this.afiliado.nss = afiliado.nss),
      (this.afiliado.actanacimiento = afiliado.actanacimiento),
      (this.afiliado.apellidomaterno = afiliado.apellidomaterno),
      (this.afiliado.apellidopaterno = afiliado.apellidopaterno),
      (this.afiliado.beneficiario1Id = afiliado.beneficiario1Id),
      (this.afiliado.beneficiario1Item = afiliado.beneficiario1Item),
      (this.afiliado.correo = afiliado.correo),
      (this.afiliado.fechaafiliacion = afiliado.fechaafiliacion),
      (this.afiliado.foto = afiliado.foto),
      (this.afiliado.genero1Id = afiliado.genero1Id),
      (this.afiliado.genero1Item = afiliado.genero1Item),
      (this.afiliado.nombre = afiliado.nombre),
      (this.afiliado.numero = afiliado.numero),
      (this.afiliado.observaciones = afiliado.observaciones),
      (this.afiliado.semanascotizadas = afiliado.semanascotizadas),
      (this.afiliado.nivel = afiliado.nivel),
      (this.afiliado.orders = afiliado.orders);
  }

  clear() {
    this.afiliado.id = null;
    this.afiliado.nss = null;
    this.afiliado.actanacimiento = '';
    this.afiliado.apellidomaterno = '';
    this.afiliado.apellidopaterno = '';
    this.afiliado.beneficiario1Id = '';
    this.afiliado.beneficiario1Item = '';
    this.afiliado.correo = '';
    this.afiliado.fechaafiliacion = null;
    this.afiliado.foto = '';
    this.afiliado.genero1Id = '';
    this.afiliado.genero1Item = '';
    this.afiliado.nombre = '';
    this.afiliado.numero = null;
    this.afiliado.observaciones = '';
    this.afiliado.semanascotizadas = null;
    this.afiliado.nivel = null;
    this.afiliado.orders = null;
  }
}
