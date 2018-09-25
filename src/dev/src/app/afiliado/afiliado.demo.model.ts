import { DecimalPipe } from '@angular/common';

export class Afiliado {
  id: number = null;
  nss: string = '';
  nombre: string = '';
  apellidopaterno: string = '';
  apellidomaterno: string = '';

  genero1Id: string = '';
  genero1Item: string = '';

  beneficiario1Id: string = '';
  beneficiario1Item: string = '';

  observaciones: string = '';
  fechaafiliacion: Date = new Date();
  foto: string = '';
  actanacimiento: string = '';
  correo: string = '';
  semanascotizadas: number = null;
  numero: number = null;
}
