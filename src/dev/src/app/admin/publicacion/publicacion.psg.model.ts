/* PSG  Publicacion Model */
import { DecimalPipe } from '@angular/common';

export class Publicacion {
  nombreobra: string = null;
  tiposubsistema: string = null;
  tiposubsistemaItem: string = null;
  tiponivel: string = null;
  tiponivelItem: string = null;
  tipoarea: string = null;
  tipoareaItem: string = null;
  fechapublicacion: number = null;
  fechapublicacionAux: Date = new Date();
  autor: string = null;
  familiarizaId: string = null;
  familiarizaItem: string = null;
  comunicadoId: string = null;
  comunicadoItem: string = null;
}
