import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Tipopension } from '../tipopension.demo.model';
import { TipopensionService } from '../tipopension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../tipopension.demo.scss'],
  templateUrl: './tipopension-administrar.demo.html',
})
export class TipopensionAdministrarDemo {
  tipopensionsArray: Tipopension[];

  constructor(private tipopensionService: TipopensionService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.cargaTipopensions();
  }

  cargaTipopensions() {
    this.tipopensionService.getRecuperaTipopensions().subscribe(
      res => {
        if (res) {
          this.tipopensionsArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      }
    );
  }

  setClickedRowEditaTipopension(index, tipopension) {
    console.log('Edita Tipopension:', tipopension);
    this.tipopensionService.setTipopension(tipopension);
    this.router.navigate(['../../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaTipopension(index, tipopension) {
    console.log('Elimina Tipopension:', tipopension);
    this.tipopensionService.setTipopension(tipopension);
    this.router.navigate(['../../eliminar'], { relativeTo: this.route });
  }
}
