import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tipopension } from './tipopension.demo.model';
import { environment } from '../../environments/environment';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class TipopensionService {
  private env: any = environment;
  private tipopension = new Tipopension();

  constructor(private http: Http) {}

  postGuardaTipopension(tipopension) {
    return this.http.post(this.env.api + '/tipopension', tipopension).pipe(map(res => res));
  }

  getRecuperaTipopensions() {
    return this.http.get(this.env.api + '/tipopension').pipe(map(res => res.json()));
  }

  deleteTipopension(tipopension) {
    return this.http.delete(this.env.api + '/tipopension/' + tipopension.id).pipe(map(res => res));
  }

  updateEditaTipopension(tipopension) {
    return this.http.put(this.env.api + '/tipopension/' + tipopension.id, tipopension).pipe(map(res => res));
  }

  resetTipopension(): Tipopension {
    this.clear();
    return this.tipopension;
  }

  getTipopension(): Tipopension {
    var tipopension: Tipopension = {
      id: this.tipopension.id,
      nss: this.tipopension.nss,
      actanacimiento: this.tipopension.actanacimiento,
      apellidomaterno: this.tipopension.apellidomaterno,
      apellidopaterno: this.tipopension.apellidopaterno,
      beneficiario1Id: this.tipopension.beneficiario1Id,
      beneficiario1Item: this.tipopension.beneficiario1Item,
      correo: this.tipopension.correo,
      fechaafiliacion: this.tipopension.fechaafiliacion,
      foto: this.tipopension.foto,
      genero1Id: this.tipopension.genero1Id,
      genero1Item: this.tipopension.genero1Item,
      nombre: this.tipopension.nombre,
      numero: this.tipopension.numero,
      observaciones: this.tipopension.observaciones,
      semanascotizadas: this.tipopension.semanascotizadas,
    };
    return tipopension;
  }

  setTipopension(tipopension: Tipopension) {
    (this.tipopension.id = tipopension.id),
      (this.tipopension.nss = tipopension.nss),
      (this.tipopension.actanacimiento = tipopension.actanacimiento),
      (this.tipopension.apellidomaterno = tipopension.apellidomaterno),
      (this.tipopension.apellidopaterno = tipopension.apellidopaterno),
      (this.tipopension.beneficiario1Id = tipopension.beneficiario1Id),
      (this.tipopension.beneficiario1Item = tipopension.beneficiario1Item),
      (this.tipopension.correo = tipopension.correo),
      (this.tipopension.fechaafiliacion = tipopension.fechaafiliacion),
      (this.tipopension.foto = tipopension.foto),
      (this.tipopension.genero1Id = tipopension.genero1Id),
      (this.tipopension.genero1Item = tipopension.genero1Item),
      (this.tipopension.nombre = tipopension.nombre),
      (this.tipopension.numero = tipopension.numero),
      (this.tipopension.observaciones = tipopension.observaciones),
      (this.tipopension.semanascotizadas = tipopension.semanascotizadas);
  }

  clear() {
    this.tipopension.id = null;
    this.tipopension.nss = null;
    this.tipopension.actanacimiento = '';
    this.tipopension.apellidomaterno = '';
    this.tipopension.apellidopaterno = '';
    this.tipopension.beneficiario1Id = '';
    this.tipopension.beneficiario1Item = '';
    this.tipopension.correo = '';
    this.tipopension.fechaafiliacion = null;
    this.tipopension.foto = '';
    this.tipopension.genero1Id = '';
    this.tipopension.genero1Item = '';
    this.tipopension.nombre = '';
    this.tipopension.numero = null;
    this.tipopension.observaciones = '';
    this.tipopension.semanascotizadas = null;
  }
}
