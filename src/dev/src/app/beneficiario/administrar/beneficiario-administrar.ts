import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Beneficiario } from '../beneficiario.demo.model';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-administrar.demo.html',
})
export class BeneficiarioAdministrarDemo {
  beneficiariosArray: Beneficiario[];

  constructor(
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargaBeneficiarios();
  }

  cargaBeneficiarios() {
    this.beneficiarioService.getRecuperaBeneficiarios().subscribe(
      res => {
        if (res) {
          this.beneficiariosArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      }
    );
  }

  setClickedRowEditaBeneficiario(index, beneficiario) {
    console.log('Edita Beneficiario:', beneficiario);
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.router.navigate(['../../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaBeneficiario(index, beneficiario) {
    console.log('Elimina Beneficiario:', beneficiario);
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.router.navigate(['../../eliminar'], { relativeTo: this.route });
  }
}
