import { DecimalPipe } from '@angular/common';

export class Solicitudpension {
  id: number = null;
  numero: number = null;

  afiliado1Id: string = '';
  afiliado1Item: string = '';

  tipopension1Id: string = '';
  tipopension1Item: string = '';

  fechasolicitud: Date = new Date();
  observaciones: string = '';
}
