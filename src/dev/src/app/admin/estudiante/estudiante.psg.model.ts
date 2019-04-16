/* PSG  Estudiante Model */
import { DecimalPipe } from '@angular/common';

export class Estudiante {
  concierneporId: string = null;
  concierneporItem: string = null;
  matricula: string = null;
  nombreestudiante: string = null;
  apellidopaterno: string = null;
  fechanacimiento: number = null;
  fechanacimientoAux: Date = new Date();
  genero: string = null;
  generoItem: string = null;
  tiponivel: string = null;
  tiponivelItem: string = null;
  tipoarea: string = null;
  tipoareaItem: string = null;
  correoest: string = null;
  telefono: string = null;
}
