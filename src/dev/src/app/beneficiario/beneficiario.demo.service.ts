import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beneficiario } from './beneficiario.demo.model';
import { environment } from '../../environments/environment';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class BeneficiarioService {
  private env: any = environment;
  private beneficiario = new Beneficiario();

  constructor(private http: Http) {}

  postGuardaBeneficiario(beneficiario) {
    return this.http.post(this.env.api + '/beneficiario', beneficiario).pipe(map(res => res));
  }

  getRecuperaBeneficiarios() {
    return this.http.get(this.env.api + '/beneficiario').pipe(map(res => res.json()));
  }

  getRecuperaBeneficiarioPorId(id){
    return this.http.get(this.env.api + '/beneficiario/' + id).pipe(map(res => res.json()));
  }

  deleteBeneficiario(beneficiario) {
    return this.http.delete(this.env.api + '/beneficiario/' + beneficiario.id).pipe(map(res => res));
  }

  updateEditaBeneficiario(beneficiario) {
    return this.http.put(this.env.api + '/beneficiario/' + beneficiario.id, beneficiario).pipe(map(res => res));
  }

  resetBeneficiario(): Beneficiario {
    this.clear();
    return this.beneficiario;
  }

  getBeneficiario(): Beneficiario {
    var beneficiario: Beneficiario = {
      id: this.beneficiario.id,
      curp: this.beneficiario.curp,
      apellidomaterno: this.beneficiario.apellidomaterno,
      apellidopaterno: this.beneficiario.apellidopaterno,
      nombre: this.beneficiario.nombre,
      fechanacimiento: this.beneficiario.fechanacimiento,
      afiliado1Id: this.beneficiario.afiliado1Id,
      afiliado1Item: this.beneficiario.afiliado1Item,
    };
    return beneficiario;
  }

  setBeneficiario(beneficiario: Beneficiario) {
    (this.beneficiario.id = beneficiario.id),
      (this.beneficiario.curp = beneficiario.curp),
      (this.beneficiario.apellidomaterno = beneficiario.apellidomaterno),
      (this.beneficiario.apellidopaterno = beneficiario.apellidopaterno),
      (this.beneficiario.nombre = beneficiario.nombre),
      (this.beneficiario.fechanacimiento = beneficiario.fechanacimiento),
      (this.beneficiario.afiliado1Id = beneficiario.afiliado1Id),
      (this.beneficiario.afiliado1Item = beneficiario.afiliado1Item);
  }

  clear() {
    this.beneficiario.id = null;
    this.beneficiario.curp = null;
    this.beneficiario.apellidomaterno = '';
    this.beneficiario.apellidopaterno = '';
    this.beneficiario.nombre = '';
    this.beneficiario.fechanacimiento = '';
    this.beneficiario.afiliado1Id = '';
    this.beneficiario.afiliado1Item = '';
    this.beneficiario.nombre = '';
  }
}
