import { Injectable }                              from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Afiliado } from './afiliado.demo.model';
import { environment } from '../../environments/environment';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class AfiliadoService {

    private env: any = environment;
    private afiliado = new Afiliado();

    constructor(private http:Http) {
    }

    postGuardarAfiliado(afiliado){
        
        return this.http.post(this.env.api + "/afiliado", afiliado).pipe(map(res => res));
       
    }

   
}
