import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Afiliado } from '../afiliado.demo.model';
import { AfiliadoService } from '../afiliado.demo.service';
import { Router, ActivatedRoute } from '@angular/router';

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
          this.afiliadosArray = res;
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the ordensimplificadas.', 'error');
      }
    );
  }

  setClickedRowEditaAfiliado(index, afiliado) {
    this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['../../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaAfiliado(index, afiliado) {
    this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['../../eliminar'], { relativeTo: this.route });
  }
}
