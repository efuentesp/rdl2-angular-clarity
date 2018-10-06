import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Afiliado } from '../afiliado.demo.model';
import { AfiliadoService } from '../afiliado.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-administrar.demo.html',
})
export class AfiliadoAdministrarDemo {
  afiliadosArray: Afiliado[];

  constructor(private afiliadoService: AfiliadoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.cargaAfiliados();
  }

  cargaAfiliados() {
    this.afiliadoService.getRecuperaAfiliados().subscribe(
      res => {
        if (res) {
          //console.log('Afiliados', res);
          this.afiliadosArray = res;
        }
      },
      error => {
        // swal({
        //   title: 'Error...',
        //   text: 'An error occurred while calling the afiliados.',
        //   type: 'error',
        //   confirmButtonText: 'OK',
        // });

        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      }
    );
  }

  setClickedRowEditaAfiliado(index, afiliado) {
    console.log('Edita Afiliado:', afiliado);
    this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['../../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaAfiliado(index, afiliado) {
    console.log('Elimina Afiliado:', afiliado);
    this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['../../eliminar'], { relativeTo: this.route });
  }
}
