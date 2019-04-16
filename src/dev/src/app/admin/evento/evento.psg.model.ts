/* PSG  Evento Model */
import { DecimalPipe } from '@angular/common';

export class Evento {
  organizadoporId: string = null;
  organizadoporItem: string = null;
  impartidoporId: string = null;
  impartidoporItem: string = null;
  clave: string = null;
  fechaevento: number = null;
  fechaeventoAux: Date = new Date();
  titulo: string = null;
  duracion: number = null;
  lugar: string = null;
  cartel: string = null;
  tipoestatus: string = null;
  tipoestatusItem: string = null;
}
