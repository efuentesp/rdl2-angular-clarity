/* PSG  Declaracionsat Model */
import { DecimalPipe } from '@angular/common';

export class Declaracionsat {
  inicioejerciciofiscal: number = null;
  inicioejerciciofiscalAux: Date = new Date();
  tipodeclaracion: string = null;
  tipodeclaracionItem: string = null;
  finejerciciofiscal: number = null;
  finejerciciofiscalAux: Date = new Date();
  fechadeclaracionanterior: number = null;
  fechadeclaracionanteriorAux: Date = new Date();
  foliodeclaracionanterior: string = null;
  mensajesproceso: string = null;
  archivo: string = null;
}
