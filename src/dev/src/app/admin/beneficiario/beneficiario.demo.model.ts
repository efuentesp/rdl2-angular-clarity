import { DecimalPipe } from '@angular/common';

export class Beneficiario {
  id: number = null;
  curp: string = '';
  nombre: string = '';
  apellidopaterno: string = '';
  apellidomaterno: string = '';
  fechanacimiento: string = '';
  afiliado1Id: string = '';
  afiliado1Item: string = '';
}
